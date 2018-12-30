package com.android.workhub.activities;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.LoginModel;
import com.android.workhub.models.LoginReturnModel;
import com.android.workhub.models.SignUpModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.util.ArrayList;

public class SignupActivity extends AppCompatActivity {

    Button button;
    private String email;
    private String firstName;
    private String lastName;
    private String password1;
    private String password2;
    private String type;

    private EditText emailView;
    private EditText firstNameView;
    private EditText lastNameView;
    private EditText password1View;
    private EditText password2View;
    private Spinner typeSpinnerView;
    ProgressDialog progressDialog;
    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;
    private ArrayList<String> list = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        emailView = findViewById(R.id.emailViewSignUp);
        firstNameView = findViewById(R.id.firstNameView);
        lastNameView = findViewById(R.id.lastNameView);
        password1View = findViewById(R.id.passwordView1);
        password2View = findViewById(R.id.passwordView2);
        typeSpinnerView = findViewById(R.id.typeView);
        progressDialog = new ProgressDialog(this);
        progressDialog.setCancelable(false);
        progressDialog.setMessage("Signing up...");
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());

        list.add("client");
        list.add("freelancer");
        typeSpinnerView.setAdapter(new ArrayAdapter<String>(getApplicationContext(),R.layout.sample_dropdown_spinner_item,list));
        button = findViewById(R.id.submitFormButton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                email = emailView.getText().toString();
                firstName = firstNameView.getText().toString();
                lastName = lastNameView.getText().toString();
                password1 = password1View.getText().toString();
                password2 = password2View.getText().toString();
                type = typeSpinnerView.getSelectedItem().toString();

                if(email == null || firstName == null || lastName == null || password1 == null ||
                        password2 == null || type == null){
                    Toast.makeText(SignupActivity.this, "You need to fill all fields to sign up", Toast.LENGTH_SHORT).show();
                    return;
                }

                if(!password1.equals(password2)){
                    Toast.makeText(SignupActivity.this, "Passwords doesn't match", Toast.LENGTH_SHORT).show();
                    return;
                }
                if(password1.length()<8){
                    Toast.makeText(SignupActivity.this, "Passwords should be at least 8 characters", Toast.LENGTH_SHORT).show();
                    return;
                }

                progressDialog.show();
                SignUpModel signUpModel = new SignUpModel(email,firstName,lastName,password1,type);


                ServerCall.signUp(signUpModel, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {

                        ServerCall.login(new LoginModel(email,password1), new WorkHubServiceListener<LoginReturnModel>() {
                            @Override
                            public void onSuccess(LoginReturnModel data) {
                                progressDialog.dismiss();
                                editor = sharedPreferences.edit();
                                editor.putString("token",data.getToken());
                                editor.putString("email", emailView.getText().toString());
                                editor.putString("type",type);
                                editor.apply();
                                Intent intent = new Intent(SignupActivity.this,MainActivity.class);
                                startActivity(intent);
                            }

                            @Override
                            public void onFailure(Exception e) {
                                progressDialog.dismiss();
                                // Log.e("login",e.getMessage());
                                Toast.makeText(SignupActivity.this,"Error while redirecting"
                                        , Toast.LENGTH_SHORT).show();
                            }
                        });
                        editor = sharedPreferences.edit();
                        editor.putString("email", emailView.getText().toString());
                        editor.apply();
                        Toast.makeText(SignupActivity.this,"You are successfully signed up. Now, redirecting to main page"
                                , Toast.LENGTH_SHORT).show();
                        Intent intent=new Intent(SignupActivity.this,MainActivity.class);
                        startActivity(intent);
                    }

                    @Override
                    public void onFailure(Exception e) {
                        progressDialog.dismiss();
                        Log.e("login",e.getMessage());
                        Toast.makeText(SignupActivity.this,"Signup faild, please try again"
                                , Toast.LENGTH_SHORT).show();
                    }
                });


            }
        });



    }

}
