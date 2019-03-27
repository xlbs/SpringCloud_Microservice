package com.xlbs.excelservice.controller;

import com.xlbs.commutils.file.upload.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Part;
import java.io.IOException;

@RestController
@RequestMapping(value = "/attachment")
public class AttachmentController {

    @Autowired
    FileUploadService fileUploadService;


    @PostMapping(value = "/upload")
    public ResponseEntity upload(@RequestPart("file") Part source) throws IOException {
        fileUploadService.upload(source);
        return ResponseEntity.ok("");
    }





}
