package com.android.workhub.utils;

import com.android.workhub.models.SimpleMessageModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.apache.commons.io.IOUtils;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;


class HttpRequester<T> {

    private String url;
    private Gson gson;

    public HttpRequester(String url) {
        this.url = url;
        this.gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").create();
    }

    public T get(String token, Class<T> clazz) throws IOException {
        HttpURLConnection connection = prepareRequest("GET");
        checkResponseStatus(connection);
        byte[] responseData = IOUtils.toByteArray(connection.getInputStream());
        String responseMessage = new String(responseData, "UTF-8");
        if (clazz.getSimpleName().contains("byte")) {
            return (T) responseData;
        }
        return gson.fromJson(responseMessage, clazz);
    }

    public T post(Object data, Class<T> clazz) throws IOException {
        HttpURLConnection connection = prepareRequest("POST");
        writeOutputStream(connection.getOutputStream(), data);
        checkResponseStatus(connection);
        byte[] responseData = IOUtils.toByteArray(connection.getInputStream());
        if (clazz.getSimpleName().contains("byte")) {
            return (T) responseData;
        }
        return gson.fromJson(new String(responseData, "UTF-8"), clazz);
    }

    public void put(String token, Object data) throws IOException {
        HttpURLConnection connection = prepareRequest("PUT");
        writeOutputStream(connection.getOutputStream(), data);
        checkResponseStatus(connection);
    }

    public void delete(String token) throws IOException {
        HttpURLConnection connection = prepareRequest("DELETE");
        checkResponseStatus(connection);
    }

    private HttpURLConnection prepareRequest(String method) throws IOException {
        URL connectionUrl = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) connectionUrl.openConnection();
        connection.setRequestMethod(method);
        connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
        connection.setRequestProperty("Accept","application/json");

        if ("POST".equals(method) || "GET".equals(method) || "DELETE".equals(method)){
            connection.setDoInput(true);
        }
        if ("POST".equals(method) || "PUT".equals(method)) {
            connection.setDoOutput(true);
        }
        connection.setConnectTimeout(10000);
        connection.setReadTimeout(60000);
        return connection;
    }

    private void writeOutputStream(OutputStream stream, Object data) throws IOException {
        DataOutputStream wr = new DataOutputStream(stream);
        wr.write(gson.toJson(data).getBytes("UTF-8"));
        wr.flush();
        wr.close();
    }

    private void checkResponseStatus(HttpURLConnection connection) throws  IOException {
        if (connection.getResponseCode() == 200) {
            return;
        }
        String errorMessage = IOUtils.toString(connection.getErrorStream(), "UTF-8");
        SimpleMessageModel messageModel = gson.fromJson(errorMessage, SimpleMessageModel.class);
        String message = messageModel != null && messageModel.getMsg() != null ? messageModel.getMsg() : errorMessage;
        //TODO with error response codes

    }
}
