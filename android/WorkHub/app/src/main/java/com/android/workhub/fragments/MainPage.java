package com.android.workhub.fragments;


import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import com.android.workhub.JobAdapter;
import com.android.workhub.R;
import com.android.workhub.models.JobModel;

import java.util.ArrayList;
import java.util.Date;


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

        Date dueTo = new Date();

        JobModel jobModel1 = new JobModel(1,"first","asd\nasdasd\n\n",dueTo);
        JobModel jobModel2 = new JobModel(2,"second","asd\nasdasd\n\n",dueTo);

        JobModel jobModel3 = new JobModel(3,"third","asd\nasdasd\n\n",dueTo);


        JobModel jobModel4 = new JobModel(4,"forth","asd\nasdasd\n\n",dueTo);


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
