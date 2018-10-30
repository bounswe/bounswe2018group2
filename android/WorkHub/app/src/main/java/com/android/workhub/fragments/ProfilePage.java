package com.android.workhub.fragments;

import android.app.Fragment;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.GetSelfReturnModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

public class ProfilePage extends Fragment {


    public ProfilePage() {

    }

    View mainView;
    String token;
    private String name;
    private String surname;
    private String desc;
    private String rate;
    private TextView nameText;
    private TextView surnameText;
    private TextView descText;
    private TextView rateText;
    ProgressDialog progressDialog;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        progressDialog = new ProgressDialog(getActivity());
        progressDialog.setMessage("Loading");
        progressDialog.setCancelable(false);
        progressDialog.show();
        mainView = inflater.inflate(R.layout.fragment_profile_page, container, false);
        token = getArguments().getString("token");

        nameText = mainView.findViewById(R.id.name_profile);
        surnameText = mainView.findViewById(R.id.surname_profile);
        descText = mainView.findViewById(R.id.description_profile);
        rateText = mainView.findViewById(R.id.rating_profile);



        ServerCall.getSelf(token, new WorkHubServiceListener<GetSelfReturnModel>() {
            @Override
            public void onSuccess(GetSelfReturnModel data) {
                progressDialog.dismiss();
                name = data.getFirstName();
                surname = data.getLastName();
                desc = data.getDesc();
                rate = data.getRating();

                nameText.setText(data.getFirstName());
                surnameText.setText(data.getLastName());
                descText.setText(data.getDesc());
                rateText.setText(data.getRating());

                //refresh it

            }

            @Override
            public void onFailure(Exception e) {
                progressDialog.dismiss();
                Toast.makeText(getActivity(), "Problem while accessing profile", Toast.LENGTH_SHORT).show();
            }
        });

        return mainView;
    }
}

