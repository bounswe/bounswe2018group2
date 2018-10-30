package com.android.workhub.fragments;


import android.content.SharedPreferences;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.app.Fragment;
import android.preference.PreferenceManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;

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
    SharedPreferences sharedPreferences;
    private String email;
    private TextView guestView;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_main_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity());
        Date dueTo = new Date();

        JobModel jobModel1 = new JobModel(1,"First Dummy Project","Description1\n\n",dueTo);
        JobModel jobModel2 = new JobModel(2,"Second Dummy Project","Description2\n\n",dueTo);

        JobModel jobModel3 = new JobModel(3,"Third Dummy Project","Description3\n\n",dueTo);


        JobModel jobModel4 = new JobModel(4,"Forth Dummy Project","Description4\n\n",dueTo);

        guestView = mainView.findViewById(R.id.guestText);

        jobList.add(jobModel1);
        jobList.add(jobModel2);
        jobList.add(jobModel3);
        jobList.add(jobModel4);

        Bundle bundle = new Bundle();
        bundle = getArguments();
        email = bundle.getString("email","");

        if(email == null || email.equals("")){
            guestView.setText("You are signed as a guest");
        }else{
            guestView.setText("");
        }
        guestView.requestLayout();


        list = mainView.findViewById(R.id.jobList);
        jobAdapter = new JobAdapter(getActivity().getApplicationContext(),jobList);
        list.setAdapter(jobAdapter);



        return mainView;
    }

}
