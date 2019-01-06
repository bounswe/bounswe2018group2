package com.android.workhub.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.AddInterestModel;
import com.android.workhub.models.CategoryModel;
import com.android.workhub.models.GetCategoriesReturnModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.models.UpdateProfileModel;
import com.android.workhub.utils.MultiSelectionSpinner;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ProfileEditPage extends Fragment {
    View mainView;
    EditText name;
    EditText surname;
    EditText desc;
    Button saveButton;
    Spinner type;
    private String token;
    MultiSelectionSpinner multiSelectionSpinner;
    Button applyBtn;
    private SharedPreferences sharedPreferences;
    CategoryModel[] categoryModels;
    public ProfileEditPage(){

    }
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_profile_edit_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity().getApplicationContext());
        token = sharedPreferences.getString("token","");
        name=mainView.findViewById(R.id.name_profile);
        surname=mainView.findViewById(R.id.surname_profile);
        desc=mainView.findViewById(R.id.description_profile);
        saveButton=mainView.findViewById(R.id.save_button);
        multiSelectionSpinner = mainView.findViewById(R.id.multiSpin);
        applyBtn = mainView.findViewById(R.id.applyInt);
        type = mainView.findViewById(R.id.type);
        final ArrayList<String> list = new ArrayList<>();
        list.add("client");
        list.add("freelancer");
        type.setAdapter(new ArrayAdapter<String>(getActivity().getApplicationContext(),R.layout.sample_dropdown_spinner_item,list));
        name.setText(getArguments().getString("name"));
        surname.setText(getArguments().getString("surname"));
        desc.setText(getArguments().getString("desc"));
        if(getArguments().getString("type").equals("client")){
            type.setSelection(0);
        }else{
            type.setSelection(1);
        }

        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                UpdateProfileModel updateProfileModel = new UpdateProfileModel();
                updateProfileModel.setFirstName(name.getText().toString());
                updateProfileModel.setLastName(surname.getText().toString());
                updateProfileModel.setDescription(desc.getText().toString());
                updateProfileModel.setType(type.getSelectedItem().toString());
                ServerCall.updateProfile(token, updateProfileModel, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(getActivity().getApplicationContext(), data.getMsg(), Toast.LENGTH_SHORT).show();
                        FragmentManager manager = getFragmentManager();
                        FragmentTransaction transaction = manager.beginTransaction();
                        Fragment fragment = (Fragment) new ProfilePage();
                        transaction.replace(R.id.frame,fragment);
                        transaction.commit();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.e("Profile Update", "onFailure: " + e.toString() );
                    }
                });
            }
        });


        ServerCall.getCategories(new WorkHubServiceListener<GetCategoriesReturnModel>() {
            @Override
            public void onSuccess(GetCategoriesReturnModel data) {
                categoryModels = data.getCategories();
                List<String> list = new ArrayList<>();
                for(CategoryModel categoryModel:categoryModels){
                    list.add(categoryModel.getName());
                }
                multiSelectionSpinner.setItems(list);
            }

            @Override
            public void onFailure(Exception e) {

            }
        });

        applyBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                List<Integer> list1 = multiSelectionSpinner.getSelectedIndicies();
                int[] toSent = new int[categoryModels.length];
                int i=0;
                for(Integer x:list1){

                    toSent[i] = categoryModels[x].getId();
                    i++;
                }
                ServerCall.addInterest(token, new AddInterestModel(toSent), new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(getActivity().getApplicationContext(), data.getMsg(), Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Log.e("ADD interest", "onFailure: " + e.getMessage() );
                    }
                });
            }
        });

        return mainView;
    }
}
