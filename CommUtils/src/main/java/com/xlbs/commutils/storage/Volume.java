package com.xlbs.commutils.storage;

import lombok.Getter;

@Getter
public class Volume implements ValueObject<Volume> {

    private int vid;

    private int rid;

    private String host;

    private int port;


}
