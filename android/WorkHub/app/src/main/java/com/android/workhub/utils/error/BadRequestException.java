package com.android.workhub.utils.error;

import com.github.scribejava.core.model.Response;

import java.io.IOException;

/**
 * Created by osman on 5/25/17.
 */

public class BadRequestException extends ServerErrorException{

    public BadRequestException(String message){
        super(message);
    }

    public BadRequestException(Response response) throws IOException {
        super(response);
    }

}
