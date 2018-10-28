package com.android.workhub.utils;

import android.os.AsyncTask;


import com.android.workhub.utils.WorkHubServiceListener;

public class WorkHubRequester<T> {

    private String url;
    private WorkHubServiceListener<T> listener;
    private HttpRequester<T> requester;

    public WorkHubRequester(String url, WorkHubServiceListener<T> listener) {
        this.url = url;
        this.listener = listener;
        this.requester = new HttpRequester<>(url);
    }

    public void get(final String token, final Class<T> clazz) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    return new ObjectAndException<T>(requester.get(token, clazz));
                } catch (Exception e) {
                    return new ObjectAndException<T>(e);
                }
            }

            @Override
            protected void onPostExecute(ObjectAndException<T> e) {
                ourPostExecute(e);
            }
        };
        task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    public void post(final Object data, final Class<T> clazz) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    return new ObjectAndException<T>(requester.post(data, clazz));
                } catch (Exception e) {
                    return new ObjectAndException<T>(e);
                }
            }

            @Override
            protected void onPostExecute(ObjectAndException<T> e) {
                ourPostExecute(e);
            }
        };
        task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    public void put(final String token, final Object data) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    requester.put(token, data);
                    return new ObjectAndException<T>();
                } catch (Exception e) {
                    return new ObjectAndException<T>(e);
                }
            }

            @Override
            protected void onPostExecute(ObjectAndException<T> e) {
                ourPostExecute(e);
            }
        };
        task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    public void delete(final String token) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    requester.delete(token);
                    return new ObjectAndException<T>();
                } catch (Exception e) {
                    return new ObjectAndException<T>(e);
                }
            }

            @Override
            protected void onPostExecute(ObjectAndException<T> e) {
                ourPostExecute(e);
            }
        };
        task.executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR);
    }

    private void ourPostExecute(ObjectAndException<T> e) {
        if (listener == null) {
            return;
        }
        try{
            listener.onSuccess(e.getObject());
        } catch (Exception ex) {
            listener.onFailure(ex);
        }
    }
}