package com.android.workhub.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.android.workhub.JobAdapter;
import com.android.workhub.R;
import com.android.workhub.models.GetAllJobsReturnModel;
import com.android.workhub.models.GetSelfReturnModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

public class JobsPage extends Fragment {
    ArrayList<JobModel> jobList;
    ListView list;
    JobAdapter jobAdapter;
    View mainView;
    String type;
    SharedPreferences sharedPreferences;
    String token;
    int id;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_jobs_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity());
        //type=sharedPreferences.getString("type","");
        token = sharedPreferences.getString("token","");
        jobList=new ArrayList<JobModel>();
        if(token.equals("")){
            Toast.makeText(getActivity().getApplicationContext(), "You need to login, please click settings menu on the top right", Toast.LENGTH_SHORT).show();
            return mainView;
        }
        ServerCall.getSelfJobs(token, new WorkHubServiceListener<GetAllJobsReturnModel>() {
            @Override
            public void onSuccess(GetAllJobsReturnModel data) {
                jobList.addAll(Arrays.asList(data.getJobs()));
                jobAdapter.notifyDataSetChanged();
            }

            @Override
            public void onFailure(Exception e) {
                Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
        list = mainView.findViewById(R.id.jobList);
        jobAdapter = new JobAdapter(getActivity().getApplicationContext(),jobList);
        list.setAdapter(jobAdapter);
        list.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {

                Bundle bundle = new Bundle();
                bundle.putInt("job_id", jobList.get(i).getId());
                bundle.putBoolean("isMine",true);

                FragmentManager manager = getFragmentManager();
                FragmentTransaction transaction = manager.beginTransaction();
                Fragment fragment = (Fragment) new JobDetailPage();
                fragment.setArguments(bundle);
                transaction.replace(R.id.frame,fragment);
                transaction.commit();
            }
        });

        return mainView;
    }
}
