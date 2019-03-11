package com.xlbs.commutils.export;

import com.xlbs.commutils.constant.ExportStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.io.*;

public abstract class AbstractExport<T> implements Export<T> {

    private final String exportPath;

    @Autowired
    public AbstractExport(@Value("${app.disk-path}") String path){
        this.exportPath = String.format("%s/export", path);
    }

//    @Value("${app.disk-path}")
//    private String rootPath;
    
    @Override
    public void export(ExportTask<T> exportTask) {
        File file;
        try {
            file = createFile(exportTask.getName());
        }catch (IOException e){
            throw new RuntimeException("Create File Failed: ", e);
        }
        exportTask.setFilePath(exportPath);
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
        File file = new File(exportPath, fileName);
        if(!file.getParentFile().exists()){
            file.getParentFile().mkdirs();
        }
        file.createNewFile();
        return file;
    }

    protected abstract void doExport(OutputStream out, T argument);

}
