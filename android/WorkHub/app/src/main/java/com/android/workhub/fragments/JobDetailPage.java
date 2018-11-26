package com.android.workhub.fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.JobDetailModel;
import com.android.workhub.models.JobDetailReturnModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

public class JobDetailPage extends Fragment {
    View mainView;
    private int job_id;
    TextView header;
    TextView description;
    TextView price;
    TextView due_date;
    TextView bidding_status;
    TextView duration;

    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_jobdetail_page, container, false);

        job_id=getArguments().getInt("job_id");
        description=mainView.findViewById(R.id.description);
        price=mainView.findViewById(R.id.price);
        due_date=mainView.findViewById(R.id.due_date);
        bidding_status=mainView.findViewById(R.id.bidding_status);
        duration=mainView.findViewById(R.id.duration);
        header=mainView.findViewById(R.id.header);




        ServerCall.getJobDetail(job_id, new WorkHubServiceListener<JobDetailReturnModel>() {
            @Override
            public void onSuccess(JobDetailReturnModel data) {
                System.out.println("asdas");
                header.setText(data.getJob().getHeader());
                description.setText(data.getJob().getDescription());
                price.setText(data.getJob().getPrice()+"");
                due_date.setText(data.getJob().getDuedate().toString());
                bidding_status.setText(data.getJob().getBidding_status());
                duration.setText(data.getJob().getDuration()+"");
            }

            @Override
            public void onFailure(Exception e) {

            }
        });
        return mainView;
    }
}
