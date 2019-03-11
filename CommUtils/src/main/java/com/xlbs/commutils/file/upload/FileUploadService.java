package com.xlbs.commutils.file.upload;

import com.xlbs.commutils.utils.RandomCodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Part;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

@Component
public class FileUploadService {

    private final String uploadPath;

    @Autowired
    public FileUploadService(@Value("${app.disk-path}") String path){
        this.uploadPath = String.format("%s/attachment", path);
    }

    public void upload(Part source) throws IOException{
        LocalDate now = LocalDate.now();
        Long id = RandomCodeUtils.getRandomId();
        String rawName = source.getSubmittedFileName();
        String extension = rawName.substring(rawName.lastIndexOf("."+1));
        String path = String.format("%d%d%d%d.%s",now.getYear(),now.getMonthValue(),now.getDayOfMonth(),id,extension);
        Path targer = Paths.get(uploadPath, path);
        if(Files.notExists(targer.getParent())){
            Files.createDirectories(targer.getParent());
        }
        source.write(targer.toString());
    }


}