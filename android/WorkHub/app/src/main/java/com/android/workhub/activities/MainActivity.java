package com.android.workhub.activities;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.Toast;
import android.widget.Toolbar;

import com.android.workhub.fragments.MainPage;
import com.android.workhub.R;
import com.android.workhub.fragments.ProfilePage;

public class MainActivity extends AppCompatActivity {
    BottomNavigationView bottomNavigationView;
    Menu settingsMenu;
    SharedPreferences sharedPreferences;
    private String email;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        email = sharedPreferences.getString("email","");
        if(!sharedPreferences.getBoolean("rememberMe",false)){
            sharedPreferences.edit()
                    .remove("email")
                    .apply();
        }
        Toast.makeText(this, email, Toast.LENGTH_SHORT).show();
        bottomNavigationView = findViewById(R.id.bottom_navigation);

        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                item.setChecked(true);
                switch (item.getItemId()){

                    case R.id.menu_main:
                        goToOpeningScreen();

                        break;
                    case R.id.menu_profile:
                        goToProfilePage();

                        break;
                }
                return false;
            }
        });

       goToOpeningScreen();
    }




    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        settingsMenu = menu;
        getMenuInflater().inflate(R.menu.menu_settings, menu);
        if(email == null || email.equals("")){
            menu.findItem(R.id.menu_login).setVisible(true);
            menu.findItem(R.id.menu_signup).setVisible(true);
            menu.findItem(R.id.menu_logout).setVisible(false);
        }else{
            menu.findItem(R.id.menu_login).setVisible(false);
            menu.findItem(R.id.menu_signup).setVisible(false);
            menu.findItem(R.id.menu_logout).setVisible(true);
        }
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()){
            case(R.id.menu_login):
                Intent loginIntent = new Intent(MainActivity.this,LoginActivity.class);
             //   login.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(loginIntent);
                break;
            case(R.id.menu_signup):
                Intent signUpIntent = new Intent(MainActivity.this,SignupActivity.class);
              //  signUpIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(signUpIntent);
                break;
            case (R.id.menu_logout):
                sharedPreferences.edit()
                        .remove("email")
                        .apply();
                Intent logoutIntent = new Intent(MainActivity.this,LoginActivity.class);
                logoutIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(logoutIntent);
        }
        return super.onOptionsItemSelected(item);
    }

    private void goToProfilePage() {
        if(email==null || email.equals("")){
            Toast.makeText(this, "You need to login to see your profile, please click settings menu on the top right",
                    Toast.LENGTH_SHORT).show();
            return;
        }

        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        Fragment fragment = (Fragment) new ProfilePage();
        transaction.replace(R.id.frame,fragment);
        transaction.commit();
    }

    private void goToOpeningScreen() {
        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        Fragment fragment = (Fragment) new MainPage();
        transaction.replace(R.id.frame,fragment);
        transaction.commit();
    }

}
