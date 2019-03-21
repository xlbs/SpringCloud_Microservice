package com.xlbs.commutils.export;

public interface Export<T> {

    void export(ExportTask<T> exportTask);

}
