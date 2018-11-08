package com.android.workhub.activities;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import android.widget.Toolbar;

import com.android.workhub.fragments.MainPage;
import com.android.workhub.R;
import com.android.workhub.fragments.ProfilePage;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
import com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;

public class MainActivity extends AppCompatActivity {

    Menu settingsMenu;
    SharedPreferences sharedPreferences;
    private String email;
    private String token;
    AHBottomNavigation ahBottomNavigation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        email = sharedPreferences.getString("email","");
        token = sharedPreferences.getString("token","");
        if(!sharedPreferences.getBoolean("rememberMe",false)){
            sharedPreferences.edit()
                    .remove("email")
                    .remove("token")
                    .apply();
        }
        // Toast.makeText(this, email, Toast.LENGTH_SHORT).show();
        ahBottomNavigation = findViewById(R.id.bottom_navigation);

        AHBottomNavigationItem item1 = new AHBottomNavigationItem("Main Page", R.drawable.ic_main);
        AHBottomNavigationItem item2 = new AHBottomNavigationItem("Profile", R.drawable.ic_profile);

        ahBottomNavigation.addItem(item1);
        ahBottomNavigation.addItem(item2);

        ahBottomNavigation.setDefaultBackgroundColor(Color.parseColor("#16f5e5"));
        ahBottomNavigation.setAccentColor(Color.parseColor("#8d2cc3"));

        ahBottomNavigation.setInactiveColor(Color.WHITE);
        ahBottomNavigation.setForceTint(true);

        ahBottomNavigation.setCurrentItem(0);
        ahBottomNavigation.setNotificationBackgroundColor(Color.parseColor("#F63D2B"));

        ahBottomNavigation.setNotification("1", 1);

        ahBottomNavigation.setItemDisableColor(Color.parseColor("#3A000000"));

        ahBottomNavigation.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener() {
            @Override
            public boolean onTabSelected(int position, boolean wasSelected) {

                switch (position){
                    case 0:
                        goToOpeningScreen();
                        break;
                    case 1:
                        goToProfilePage();

                        break;
                }
                return true;
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
                        .remove("token")
                        .apply();

                ServerCall.logout(token, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Intent logoutIntent = new Intent(MainActivity.this,LoginActivity.class);
                        logoutIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        startActivity(logoutIntent);
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });


        }
        return super.onOptionsItemSelected(item);
    }

    private void goToProfilePage() {
        if(email==null || email.equals("")){
            Toast.makeText(this, "You need to login to see your profile, please click settings menu on the top right",
                    Toast.LENGTH_SHORT).show();
            return;
        }
        if(token==null || token.equals("")){
            Toast.makeText(this, "Error while receiving token",
                    Toast.LENGTH_SHORT).show();
            return;
        }

        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        Fragment fragment = (Fragment) new ProfilePage();
        Bundle bundle = new Bundle();
        bundle.putString("token",token);
        fragment.setArguments(bundle);
        transaction.replace(R.id.frame,fragment);
        transaction.commit();
    }

    private void goToOpeningScreen() {
        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        Fragment fragment = (Fragment) new MainPage();
        Bundle bundle = new Bundle();
        bundle.putString("email",email);
        fragment.setArguments(bundle);
        transaction.replace(R.id.frame,fragment);
        transaction.commit();
    }

}
