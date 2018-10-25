package com.android.workhub.activities;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;

import com.android.workhub.MainPage;
import com.android.workhub.R;

public class MainActivity extends AppCompatActivity {
    BottomNavigationView bottomNavigationView;
    Button button;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

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
       // goToOpeningScreen();
    }

    private void goToProfilePage() {
        FragmentManager manager = getFragmentManager();
        FragmentTransaction transaction = manager.beginTransaction();
        Fragment fragment = (Fragment) new MainPage();
        transaction.replace(R.id.frame,fragment);
        transaction.commit();
    }

    private void goToOpeningScreen() {

    }
}
