package com.android.workhub.fragments;

import android.app.DatePickerDialog;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;


public class CreateJobPage extends Fragment {
    Calendar myCalendar;
    View mainView;
    EditText header;
    EditText description;
    EditText price;
    EditText date;
    Button createJobButton;
    public CreateJobPage(){

    }
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.create_job, container, false);
        header =mainView.findViewById(R.id.header);
        description = mainView.findViewById(R.id.description);
        price = mainView.findViewById(R.id.price);
        date=mainView.findViewById(R.id.date);
        createJobButton = mainView.findViewById(R.id.createJobButton);
        myCalendar = Calendar.getInstance();
        final DatePickerDialog.OnDateSetListener dateTime = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,
                                  int dayOfMonth) {
                // TODO Auto-generated method stub
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, monthOfYear);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateLabel();
            }

        };

        date.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                new DatePickerDialog(getActivity(), dateTime, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });
        createJobButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(header.getText().toString().equals("") || description.getText().toString().equals("")||price.getText().toString().equals("")){
                    Toast.makeText(getActivity(), "header,descrption and price sould not be empty", Toast.LENGTH_SHORT).show();
                    return;
                }

                JobModel jobModel =new JobModel();
                jobModel.setClientId(1);
                jobModel.setHeader(header.getText().toString());
                jobModel.setDescription(description.getText().toString());
                jobModel.setPrice(Integer.parseInt(price.getText().toString()));
                jobModel.setDueDate(myCalendar.getTime());
                ServerCall.createJob(jobModel, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(getActivity(), data.getMsg(), Toast.LENGTH_SHORT).show();
                        FragmentManager manager = getFragmentManager();
                        FragmentTransaction transaction = manager.beginTransaction();
                        Fragment fragment = (Fragment) new MainPage();
                        transaction.replace(R.id.frame,fragment);
                        transaction.commit();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(getActivity(), "asdasd", Toast.LENGTH_SHORT).show();

                    }
                });

            }
        });
        return mainView;
    }
    private void updateLabel() {
        String myFormat = "MM/dd/yy"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.US);

        date.setText(sdf.format(myCalendar.getTime()));
    }
}
