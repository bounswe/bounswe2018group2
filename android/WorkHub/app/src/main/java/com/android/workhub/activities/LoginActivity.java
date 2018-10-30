package com.android.workhub.activities;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.LoginModel;
import com.android.workhub.models.LoginReturnModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

public class LoginActivity extends AppCompatActivity implements View.OnKeyListener {

    Button submitButton;
    Button signUpButton;
    EditText emailView;
    EditText passwordView;
    Switch rememberMeSwitch;
    SharedPreferences sharedPreferences;
    SharedPreferences.Editor editor;
    ProgressDialog progressDialog;
    private String email;
    private String password;
    private Button gusetguestButton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        submitButton=findViewById(R.id.submitButton);
        signUpButton=findViewById(R.id.signupButton);
        emailView =findViewById(R.id.emailView);
        passwordView=findViewById(R.id.passwordView);
        rememberMeSwitch=findViewById(R.id.rememberMeSwitch);
        gusetguestButton = findViewById(R.id.guestButton);
        passwordView.setOnKeyListener(this);
        progressDialog = new ProgressDialog(this);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this,SignupActivity.class);
                startActivity(intent);
            }
        });
        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                email = emailView.getText().toString();
                password = passwordView.getText().toString();
                login(email,password);

            }
        });

        gusetguestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public boolean onKey(View v, int keyCode, KeyEvent event) {
        if(event.getKeyCode()==KeyEvent.KEYCODE_ENTER){
            email = emailView.getText().toString();
            password = passwordView.getText().toString();
            login(email,password);
            return true;
        }
        return false;
    }

    public  void login(String email,String password){
        hideKeyboard(this);
        if(email.equals("")||password.equals("")){
            return;
        }
        if(password.length()<8){
            Toast.makeText(this, "Password should be at least 8 characters", Toast.LENGTH_SHORT).show();
            return;
        }

        progressDialog.setCancelable(false);
        progressDialog.setMessage("Logining...");
        progressDialog.show();
        ServerCall.login(new LoginModel(email,password),new WorkHubServiceListener<LoginReturnModel>() {
            @Override
            public void onSuccess(LoginReturnModel data) {
                progressDialog.dismiss();
                editor = sharedPreferences.edit();
                editor.putString("token",data.getToken());

                if(rememberMeSwitch.isChecked()){
                    editor.putBoolean("rememberMe",true);
                }else{
                    editor.putBoolean("rememberMe",false);
                }
                editor.putString("email", emailView.getText().toString());
                editor.apply();
                Intent intent = new Intent(LoginActivity.this,MainActivity.class);
                startActivity(intent);

            }


            @Override
            public void onFailure(Exception e) {
                progressDialog.dismiss();
                // Log.e("login",e.getMessage());
                Toast.makeText(LoginActivity.this,"Wrong email or password, please try again"
                        , Toast.LENGTH_SHORT).show();
            }
        });


    }
    public static void hideKeyboard(Activity activity) {
        InputMethodManager imm = (InputMethodManager) activity.getSystemService(Activity.INPUT_METHOD_SERVICE);
        //Find the currently focused view, so we can grab the correct window token from it.
        View view = activity.getCurrentFocus();
        //If no view currently has focus, create a new one, just so we can grab a window token from it
        if (view == null) {
            view = new View(activity);
        }
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }
}
