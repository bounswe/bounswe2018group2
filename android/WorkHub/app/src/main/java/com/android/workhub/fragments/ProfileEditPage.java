package com.android.workhub.fragments;

import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.workhub.R;

public class ProfileEditPage extends Fragment {
    View mainView;
    EditText name;
    EditText surname;
    EditText desc;
    Button saveButton;
    public ProfileEditPage(){

    }
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_profile_edit_page, container, false);
        name=mainView.findViewById(R.id.name_profile);
        surname=mainView.findViewById(R.id.surname_profile);
        desc=mainView.findViewById(R.id.description_profile);
        saveButton=mainView.findViewById(R.id.save_button);
        name.setText(getArguments().getString("name"));
        surname.setText(getArguments().getString("surname"));
        desc.setText(getArguments().getString("desc"));
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getActivity().getApplicationContext(), name.getText()+" "+surname.getText()+" "+desc.getText(), Toast.LENGTH_SHORT).show();
            }
        });

        return mainView;
    }
}
