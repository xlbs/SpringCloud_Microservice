package com.xlbs.commutils.storage;

import com.fasterxml.jackson.databind.JavaType;

import java.io.IOException;

public interface JSONStorage {

    <T extends Form> void write(T form) throws IOException;

    <T extends Form> void read(JavaType formType, Form form) throws IOException;

   void delete(Form form) throws IOException;



}
