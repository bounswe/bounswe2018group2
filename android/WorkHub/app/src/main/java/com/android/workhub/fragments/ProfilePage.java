package com.android.workhub.fragments;

import android.app.Fragment;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;

import com.android.workhub.JobAdapter;
import com.android.workhub.R;
import com.android.workhub.models.JobModel;

import java.util.ArrayList;

public class ProfilePage extends Fragment {


    public ProfilePage() {

    }

    View mainView;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_profile_page, container, false);


        return mainView;
    }
}

