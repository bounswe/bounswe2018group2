package com.android.workhub.fragments;


import android.content.SharedPreferences;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.app.Fragment;
import android.preference.PreferenceManager;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.JobAdapter;
import com.android.workhub.R;
import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

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

    FloatingActionButton addJobButton;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_main_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity());
        guestView = mainView.findViewById(R.id.guestText);
        Bundle bundle = new Bundle();
        bundle = getArguments();
        email = bundle.getString("email","");
        addJobButton = mainView.findViewById(R.id.button_add_job);

        if(email == null || email.equals("")){
            guestView.setText("You are signed as a guest");
            addJobButton.setVisibility(View.GONE);
        }else{
            guestView.setText("");
            addJobButton.setVisibility(View.VISIBLE);
        }
        guestView.requestLayout();

        ServerCall.getAllJobs(new WorkHubServiceListener<GetAllJobsReturnModel>() {
            @Override
            public void onSuccess(GetAllJobsReturnModel data) {
                Toast.makeText(getActivity(), data.getMsg(), Toast.LENGTH_SHORT).show();

                /*
                for(JobModel job:jobs){
                    JobModel jobModel = new JobModel();
                    jobModel.setHeader(job.getHeader());
                    jobModel.setDescription(job.getDescription());
                    jobModel.setDueDate(job.getDueDate());
                    jobModel.setCategories(job.getCategories());
                    jobModel.setPrice(job.getPrice());
                    jobList.add(jobModel);
                }
                */

            }

            @Override
            public void onFailure(Exception e) {
                Toast.makeText(getActivity(), e.toString(), Toast.LENGTH_SHORT).show();
            }
        });

        JobModel jobModel = new JobModel();
        jobModel.setPrice(3);
        jobModel.setHeader("deneme");
        jobModel.setDescription("asdasdas\n12312312iğüü,\nadsasd");
        int[] asd = new int[1];
        asd[0] = 123;
        jobModel.setCategories(asd);
        jobModel.setDueDate(new Date());
        jobList.add(jobModel);
        list = mainView.findViewById(R.id.jobList);
        jobAdapter = new JobAdapter(getActivity().getApplicationContext(),jobList);
        list.setAdapter(jobAdapter);


        addJobButton.setOnClickListener(new View.OnClickListener() {

            public void onClick(View view) {
                Snackbar.make(view, "Here's a Snackbar", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }

        });


        return mainView;
    }

}
