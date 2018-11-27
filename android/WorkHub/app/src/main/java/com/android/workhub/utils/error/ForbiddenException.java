package com.android.workhub.utils.error;

import com.github.scribejava.core.model.Response;

import java.io.IOException;

/**
 * Created by osman on 5/25/17.
 */

public class ForbiddenException extends ServerErrorException{

    public ForbiddenException(String message){
        super(message);
    }

    public ForbiddenException(Response response) throws IOException {
        super(response);
    }

}
