package com.android.workhub;


import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import com.android.workhub.models.JobModel;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class MainPage extends Fragment {


    public MainPage() {

    }

    ListView list;
    View mainView;
    JobAdapter jobAdapter;
    ArrayList<JobModel> jobList = new ArrayList<>();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_main_page, container, false);

        Bitmap bitmap = BitmapFactory.decodeResource(getResources(),R.drawable.ic_username);

        JobModel jobModel1 = new JobModel(1,"first","asd\nasdasd\n\n",bitmap);
        JobModel jobModel2 = new JobModel(2,"first","asd\nasdasd\n\n",bitmap);

        JobModel jobModel3 = new JobModel(3,"first","asd\nasdasd\n\n",bitmap);


        JobModel jobModel4 = new JobModel(4,"first","asd\nasdasd\n\n",bitmap);


        jobList.add(jobModel1);
        jobList.add(jobModel2);
        jobList.add(jobModel3);
        jobList.add(jobModel4);


        list = mainView.findViewById(R.id.jobList);
        jobAdapter = new JobAdapter(getActivity().getApplicationContext(),jobList);
        list.setAdapter(jobAdapter);



        return mainView;
    }

}
