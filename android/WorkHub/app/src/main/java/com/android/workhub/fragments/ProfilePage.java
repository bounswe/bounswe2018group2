package com.android.workhub.fragments;

import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.MediaStore;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.GetSelfReturnModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.io.FileNotFoundException;
import java.io.IOException;

public class ProfilePage extends Fragment {


    public ProfilePage() {

    }

    View mainView;
    String token;
    private String name;
    private String surname;
    private String desc;
    private String rate;
    private String type;
    private TextView nameText;
    private TextView surnameText;
    private TextView descText;
    private TextView rateText;
    private TextView typeText;
    private Button profileEditButton;
    ProgressDialog progressDialog;
    private Bundle bundle;
    private ImageView image;
    private SharedPreferences sharedPreferences;
    public static final int GET_FROM_GALLERY = 3;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        progressDialog = new ProgressDialog(getActivity());
        progressDialog.setMessage("Loading");
        progressDialog.setCancelable(false);
        progressDialog.show();
        mainView = inflater.inflate(R.layout.fragment_profile_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity().getApplicationContext());
        token = sharedPreferences.getString("token","");
        image = mainView.findViewById(R.id.image_profile);
        nameText = mainView.findViewById(R.id.name_profile);
        surnameText = mainView.findViewById(R.id.surname_profile);
        descText = mainView.findViewById(R.id.description_profile);
        rateText = mainView.findViewById(R.id.rating_profile);
        typeText = mainView.findViewById(R.id.type_profile);
        profileEditButton = mainView.findViewById(R.id.profile_edit_button);

        image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivityForResult(new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.INTERNAL_CONTENT_URI), GET_FROM_GALLERY);
            }
        });

        profileEditButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FragmentManager manager = getFragmentManager();
                FragmentTransaction transaction =manager.beginTransaction();
                Fragment fragment= new ProfileEditPage();
                fragment.setArguments(bundle);
                transaction.replace(R.id.frame,fragment);
                transaction.commit();

            }
        });

        ServerCall.getSelf(token, new WorkHubServiceListener<GetSelfReturnModel>() {
            @Override
            public void onSuccess(GetSelfReturnModel data) {

                name = data.getFirstName();
                surname = data.getLastName();
                desc = data.getDescription();
                rate = data.getRating();
                type = data.getType();
                bundle=new Bundle();
                bundle.putString("name",name);
                bundle.putString("surname",surname);
                bundle.putString("desc",desc);
                bundle.putString("type",type);
                progressDialog.dismiss();

                nameText.setText(data.getFirstName());
                surnameText.setText(data.getLastName());
                descText.setText(data.getDescription());
                rateText.setText(data.getRating());
                typeText.setText(data.getType());
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
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        //Detects request codes
        if(requestCode==GET_FROM_GALLERY && resultCode == Activity.RESULT_OK) {
            Uri selectedImage = data.getData();
            Bitmap bitmap = null;
            try {

                bitmap = MediaStore.Images.Media.getBitmap(getActivity().getContentResolver(), selectedImage);
                bitmap = rotateImageIfRequired(bitmap,selectedImage);
                image.setImageBitmap(Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight()));
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static Bitmap rotateImageIfRequired(Bitmap img, Uri selectedImage) throws IOException {

        ExifInterface ei = new ExifInterface(selectedImage.getPath());
        int orientation = ei.getAttributeInt(ExifInterface.TAG_ORIENTATION, ExifInterface.ORIENTATION_NORMAL);

        switch (orientation) {
            case ExifInterface.ORIENTATION_ROTATE_90:
                return rotateImage(img, 90);
            case ExifInterface.ORIENTATION_ROTATE_180:
                return rotateImage(img, 180);
            case ExifInterface.ORIENTATION_ROTATE_270:
                return rotateImage(img, 270);
            default:
                return img;
        }
    }

    private static Bitmap rotateImage(Bitmap img, int degree) {
        Matrix matrix = new Matrix();
        matrix.postRotate(degree);
        Bitmap rotatedImg = Bitmap.createBitmap(img, 0, 0, img.getWidth(), img.getHeight(), matrix, true);
        img.recycle();
        return rotatedImg;
    }

}

