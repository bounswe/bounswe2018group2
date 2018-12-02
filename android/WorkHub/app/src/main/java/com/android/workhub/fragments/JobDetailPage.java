package com.android.workhub.fragments;

import android.app.Fragment;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.JobDetailModel;
import com.android.workhub.models.JobDetailReturnModel;
import com.android.workhub.models.SendNotificationModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.Tasks.SendNotificationTask;
import com.android.workhub.utils.WorkHubServiceListener;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class JobDetailPage extends Fragment {
    View mainView;
    private int job_id;
    TextView header;
    TextView description;
    TextView price;
    TextView due_date;
    TextView bidding_status;
    TextView duration;
    Button notifyButton;
    Switch customButton;
    EditText customeMessage;
    TextView messageLabel;
    private String token;
    private String message_type;
    private String descriptionNotification;

    private SharedPreferences sharedPreferences;
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_jobdetail_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity().getApplicationContext());
        token = sharedPreferences.getString("token","");


        job_id=getArguments().getInt("job_id");
        description=mainView.findViewById(R.id.description);
        price=mainView.findViewById(R.id.price);
        due_date=mainView.findViewById(R.id.due_date);
        bidding_status=mainView.findViewById(R.id.bidding_status);
        duration=mainView.findViewById(R.id.duration);
        header=mainView.findViewById(R.id.header);
        customButton=mainView.findViewById(R.id.customButton);
        notifyButton=mainView.findViewById(R.id.notifyButton);
        customeMessage=mainView.findViewById(R.id.customMessage);
        messageLabel =mainView.findViewById(R.id.customMessageLabel);
        if(sharedPreferences.getString("email","").equals("")){
            customButton.setVisibility(View.GONE);
            notifyButton.setVisibility(View.GONE);
            customeMessage.setVisibility(View.GONE);
            messageLabel.setVisibility(View.GONE);
        }

        customButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(customButton.isChecked()){
                    customeMessage.setVisibility(View.VISIBLE);
                }
                else{
                    customeMessage.setVisibility(View.GONE);
                }

            }
        });



        ServerCall.getJobDetail(job_id, new WorkHubServiceListener<JobDetailReturnModel>() {
            @Override
            public void onSuccess(JobDetailReturnModel data) {
                header.setText(data.getJob().getHeader());
                description.setText(data.getJob().getDescription());
                price.setText("$"+data.getJob().getPrice()+"");
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:sss'Z'");
                Date date = new Date();
                try {
                    date = format.parse(data.getJob().getDuedate());
                } catch (ParseException e) {
                    Log.e("JobDetail", "onFailure: " + e.toString() );
                }
                String dateString = new SimpleDateFormat("dd/MM/yyyy",
                        Locale.getDefault()).format(date);
                due_date.setText(dateString);

                if(data.getJob().getBidding_status().equals("open")){
                    bidding_status.setText("open");
                    bidding_status.setTextColor(Color.GREEN);
                }
                else{
                    bidding_status.setText("closed");
                    bidding_status.setTextColor(Color.RED);
                }


                duration.setText(data.getJob().getDuration()+" days");
            }

            @Override
            public void onFailure(Exception e) {
                Log.e("JobDetail", "onFailure: " + e.toString() );
            }
        });
        notifyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SendNotificationModel model = new SendNotificationModel();
                model.setJob_id(job_id);
                if(customButton.isChecked()){
                    model.setMessage_type("custom");
                    model.setDescription(customeMessage.getText().toString());
                }
                else {
                    model.setMessage_type("status");
                }

                ServerCall.sendNotification(token, model, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        customButton.setVisibility(View.GONE);
                        notifyButton.setVisibility(View.GONE);
                        customeMessage.setVisibility(View.GONE);
                        messageLabel.setVisibility(View.GONE);
                        Toast.makeText(getActivity().getApplicationContext(), "Successfully", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        return mainView;
    }
}
