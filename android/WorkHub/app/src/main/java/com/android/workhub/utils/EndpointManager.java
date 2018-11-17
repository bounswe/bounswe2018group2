package com.android.workhub.utils;

public class EndpointManager {

    public static String SERVER_URL = "http://34.210.153.98:3000";

    public static String getServerUrl() {
        return SERVER_URL;
    }

    public static void setServerUrl(String serverUrl) {
        SERVER_URL = serverUrl;
    }

    public static String getLoginUrl() {
        return SERVER_URL + "/user/login";
    }

    public static String getSignUpUrl() {
        return SERVER_URL + "/user/create";
    }

    public static String getGetSelfUrl(){
        return SERVER_URL + "/member" ;
    }

    public static String getLogoutUrl(){
        return SERVER_URL + "/user/logout" ;
    }

    public static String getGetAllJobsUrl(){ return SERVER_URL + "/job/getalljobs" ; }
    public static String getCreateJobUrl(){return SERVER_URL +"/job/create";}
}
