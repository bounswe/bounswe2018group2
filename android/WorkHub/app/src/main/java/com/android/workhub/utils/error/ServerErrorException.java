package com.android.workhub.utils.error;

import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.HttpRequestHelper;
import com.github.scribejava.core.model.Response;
import com.google.gson.Gson;

import java.io.IOException;

/**
 * Created by osman on 5/25/17.
 */

public class ServerErrorException extends Exception {

    public ServerErrorException(String message){
        super(message);
    }

    public ServerErrorException(String message, Exception e){
        super(message, e);
    }

    public ServerErrorException(Response response) throws IOException {
        super(parseBodyAsMessage(HttpRequestHelper.convertInputStreamToString(response.getStream())));
    }

    private static String parseBodyAsMessage(String body) {
        try{
            Gson gson = new Gson();
            SimpleMessageModel messageModel = gson.fromJson(body, SimpleMessageModel.class);
            if (messageModel == null || messageModel.getMsg() == null) {
                return body;
            }
            return messageModel.getMsg();
        } catch (Exception e) {
            return body;
        }
    }

}
