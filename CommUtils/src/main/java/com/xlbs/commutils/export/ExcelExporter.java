package com.xlbs.commutils.export;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ExcelExporter {

    private final SXSSFWorkbook wb = new SXSSFWorkbook();

    private SXSSFSheet sheet;

    private CellStyle dataStyle;

    /**
     * excel对象
     * @param sheetTitle 标题
     * @param columnWidths 列宽
     * @param headers 表头
     */
    public ExcelExporter(String sheetTitle, int[] columnWidths, String[] headers){

        this.sheet = wb.createSheet(sheetTitle);

        for (int i=0; i<columnWidths.length; i++){
            int columnWidth = columnWidths[i];
            this.sheet.setColumnWidth(i, columnWidth);
        }

        CellStyle headStyle = wb.createCellStyle();
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);
        Font font = wb.createFont();
        font.setBold(true);
        headStyle.setFont(font);
        headStyle.setAlignment(HorizontalAlignment.CENTER);
        headStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GREY_25_PERCENT.getIndex());
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        SXSSFRow headRow = this.sheet.createRow(0);
        for (int i=0; i<headers.length; i++){
            SXSSFCell cell = headRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headStyle);
        }

        dataStyle = wb.createCellStyle();
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setAlignment(HorizontalAlignment.CENTER);
        dataStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        dataStyle.setWrapText(true);
    }

    public void fillData(String[] dataKeys, List<Map<Object,Object>> data){
        for (int i=0; i<data.size(); i++){
            SXSSFRow row = this.sheet.createRow(i+1);
            for (int j=0; j<dataKeys.length; j++){
                Cell cell = row.createCell(j);
                Object cellData = data.get(i).get(dataKeys[j]);
                if(null==cellData){
                    cell.setCellValue("");
                }else{
                    if(cellData instanceof String){
                        cell.setCellValue((String)cellData);
                    }else if(cellData instanceof Date){
                        cell.setCellValue((Date)cellData);
                    }else{
                        cell.setCellValue(cellData.toString());
                    }
                }
                cell.setCellStyle(dataStyle);
            }
        }
    }

    public void  write(OutputStream out) throws IOException{
        wb.write(out);
    }

    public void close() throws IOException{
        wb.dispose();
        wb.close();
    }



}
