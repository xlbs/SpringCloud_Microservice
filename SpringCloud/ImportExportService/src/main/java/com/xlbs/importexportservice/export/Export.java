package com.xlbs.importexportservice.export;


public interface Export<T> {

    void export(ExportTask<T> exportTask);

}
