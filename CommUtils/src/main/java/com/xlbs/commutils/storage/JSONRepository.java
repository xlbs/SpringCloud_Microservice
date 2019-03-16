package com.xlbs.commutils.storage;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Objects;

@Repository
public class JSONRepository implements JSONStorage {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JSONClient jsonClient;


    @Override
    public <T extends Form> void write(T form) throws IOException {
        byte[] json = objectMapper.writeValueAsBytes(form);
        Long createdBy = form.getCreatedBy();
        if(Objects.isNull(form.getFilePath())){
            JSONFile jsonFile = jsonClient.saveJsonFile(String.format("%d.json", form.getId()), new ByteArrayInputStream(json), createdBy);
            form.setFilePath(jsonFile.getFid());
        }else{
            String digest = jsonClient.makeDigest(form.getFilePath(), form.getCreatedBy());

        }
    }

    @Override
    public <T extends Form> void read(JavaType formType, Form form) throws IOException {

    }

    @Override
    public void delete(Form form) throws IOException {

    }
}
