package com.android.workhub.activities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnKeyListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.R;

public class LoginActivity extends AppCompatActivity implements View.OnKeyListener {

    Button submitButton;
    Button signUpButton;
    EditText usernameView;
    EditText passwordView;
    Switch rememberMeSwitch;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        submitButton=findViewById(R.id.submitButton);
        signUpButton=findViewById(R.id.signupButton);
        usernameView=findViewById(R.id.usernameView);
        passwordView=findViewById(R.id.passwordView);
        rememberMeSwitch=findViewById(R.id.rememberMeSwitch);
        passwordView.setOnKeyListener(this);

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
                loginIntent();
                Toast.makeText(LoginActivity.this, getString(R.string.app_name), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public boolean onKey(View v, int keyCode, KeyEvent event) {
        if(event.getKeyCode()==KeyEvent.KEYCODE_ENTER){
            loginIntent();
            return true;
        }
        return false;
    }

    public  void loginIntent(){
        Intent intent = new Intent(LoginActivity.this,MainActivity.class);
        startActivity(intent);

    }
}
