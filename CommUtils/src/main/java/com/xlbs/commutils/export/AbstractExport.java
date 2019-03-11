package com.xlbs.commutils.export;

import com.xlbs.commutils.constant.ExportStatus;
import com.xlbs.commutils.constant.FilePath;

import java.io.*;

public abstract class AbstractExport<T> implements Export<T> {

    @Override
    public void export(ExportTask<T> exportTask) {
        File file;
        try {
            file = createFile(exportTask.getName());
        }catch (IOException e){
            throw new RuntimeException("Create File Failed: ", e);
        }
        exportTask.setFilePath(FilePath.getExportPath());
        try {
            OutputStream out = new BufferedOutputStream(new FileOutputStream(file));
            doExport(out, exportTask.getArgument());
            exportTask.end(ExportStatus.SUCCESS);
        }catch (Throwable e){
            if(file.exists()){
                file.delete();
            }
            exportTask.end(ExportStatus.FAILED);
            System.out.println("Export: "+exportTask.getName()+" Failed ");
        }

    }

    private File createFile(String fileName) throws IOException{
        File file = new File(FilePath.getExportPath(), fileName);
        if(!file.getParentFile().exists()){
            file.getParentFile().mkdirs();
        }
        file.createNewFile();
        return file;
    }

    protected abstract void doExport(OutputStream out, T argument);

}
