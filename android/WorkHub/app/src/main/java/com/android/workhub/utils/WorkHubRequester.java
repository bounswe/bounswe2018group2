package com.android.workhub.utils;

import android.os.AsyncTask;

public class WorkHubRequester<T> {

    private String url;
    private WorkHubServiceListener<T> listener;
    private HttpRequester<T> requester;

    public WorkHubRequester(String url, WorkHubServiceListener<T> listener) {
        this.url = url;
        this.listener = listener;
        this.requester = new HttpRequester<>(url);
    }
    public void get(final Class<T> clazz) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    return new ObjectAndException<T>(requester.get(clazz));
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


    public void getWithToken(final String token, final Class<T> clazz) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    return new ObjectAndException<T>(requester.getWithToken(token, clazz));
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
    public void postToken(final String token, final Class<T> clazz) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    return new ObjectAndException<T>(requester.postToken(token, clazz));
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
    public void postWithToken(final String token,final Object data, final Class<T> clazz) {
        AsyncTask<Void, Void, ObjectAndException<T>> task = new AsyncTask<Void, Void, ObjectAndException<T>>(){

            @Override
            protected ObjectAndException<T> doInBackground(Void... voids) {
                try {
                    return new ObjectAndException<T>(requester.postWithToken(token,data, clazz));
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
                    requester.put(data);
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
                    requester.delete();
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