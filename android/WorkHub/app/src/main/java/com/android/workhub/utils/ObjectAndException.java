package com.android.workhub.utils;


class ObjectAndException<T> {

    private T object = null;
    private Exception exception = null;

    ObjectAndException(T object) {
        this.object = object;
    }

    ObjectAndException() {

    }

    ObjectAndException(Exception e) {
        this.exception = e;
    }

    T getObject() throws Exception {
        if (exception != null) {
            throw exception;
        }
        return object;
    }
}
