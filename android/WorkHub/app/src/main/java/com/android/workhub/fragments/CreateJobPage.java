package com.android.workhub.fragments;

import android.app.Activity;
import android.app.DatePickerDialog;
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
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.activities.MainActivity;
import com.android.workhub.models.CategoryModel;
import com.android.workhub.models.GetMediaReturnModel;
import com.android.workhub.models.JobField;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.MediaModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;


public class CreateJobPage extends Fragment {
    Calendar myCalendar;
    View mainView;
    EditText header;
    EditText description;
    EditText price;
    EditText date;
    EditText duration;
    EditText bidding;
    Button createJobButton;
    SharedPreferences sharedPreferences;
    String token;
    SimpleDateFormat simpleDateFormat;
    Button addMedia;
    private String url;
    private String encoded;
    public static final int GET_FROM_GALLERY = 3;
    private String descriptionText = "";

    public CreateJobPage(){

    }
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        // inits

        mainView = inflater.inflate(R.layout.create_job, container, false);
        header =mainView.findViewById(R.id.header);
        description = mainView.findViewById(R.id.description);
        price = mainView.findViewById(R.id.price);
        date=mainView.findViewById(R.id.date);
        duration = mainView.findViewById(R.id.duration);
        createJobButton = mainView.findViewById(R.id.createJobButton);
        myCalendar = Calendar.getInstance();
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity().getApplicationContext());
        token = sharedPreferences.getString("token","");
        simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        addMedia = mainView.findViewById(R.id.addMedia);

        // date picker

        final DatePickerDialog.OnDateSetListener dateTime = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear,
                                  int dayOfMonth) {
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, monthOfYear);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateLabel();
            }

        };

        date.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                new DatePickerDialog(getActivity(), dateTime, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });

        addMedia.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivityForResult(new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.INTERNAL_CONTENT_URI), GET_FROM_GALLERY);

            }
        });



        // create job functioanlity

        createJobButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                // header and description can not be empty

                if(header.getText().toString().equals("") || description.getText().toString().equals("")||price.getText().toString().equals("")){
                    Toast.makeText(getActivity(), "header,descrption and price sould not be empty", Toast.LENGTH_SHORT).show();
                    return;
                }

                JobModel jobModel =new JobModel();
                jobModel.setHeader(header.getText().toString());
                if(descriptionText.equals("")){
                    jobModel.setDescription(description.getText().toString());
                }else{
                    jobModel.setDescription(descriptionText);
                }

                jobModel.setPrice(Integer.parseInt(price.getText().toString()));
                jobModel.setDuration(Integer.parseInt(duration.getText().toString()));
                jobModel.setDueDate(myCalendar.getTime().toString());
                int[] temp = new int[10];
                jobModel.setCategories(temp);
                final ProgressDialog progressDialog = new ProgressDialog(getActivity());
                progressDialog.setCancelable(false);
                progressDialog.show();
                ServerCall.createJob(token,jobModel, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        progressDialog.dismiss();
                        Toast.makeText(getActivity(), data.getMsg(), Toast.LENGTH_SHORT).show();
                        FragmentManager manager = getFragmentManager();
                        FragmentTransaction transaction = manager.beginTransaction();
                        Fragment fragment = (Fragment) new MainPage();
                        transaction.replace(R.id.frame,fragment);
                        transaction.commit();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        progressDialog.dismiss();
                        Toast.makeText(getActivity().getApplicationContext(), "Creating job failed", Toast.LENGTH_SHORT).show();
                    }
                });

            }
        });
        return mainView;
    }
    private void updateLabel() {
        String myFormat = "dd/MM/yyyy"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.US);

        date.setText(sdf.format(myCalendar.getTime()));
    }


    // when media uploaded activity results and enter this function

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        //Detects request codes
        if(requestCode==GET_FROM_GALLERY && resultCode == Activity.RESULT_OK) {
            Uri selectedImage = data.getData();
            Bitmap bitmap = null;
            try {

                // get media and convert it to base64 then upload to server and get link

                // get bitmap from madia and compress it

                bitmap = MediaStore.Images.Media.getBitmap(getActivity().getContentResolver(), selectedImage);
                bitmap = rotateImageIfRequired(bitmap,selectedImage);
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 10, byteArrayOutputStream);

                // convert bitmap to base 64

                byte[] byteArray = byteArrayOutputStream .toByteArray();
                try{
                    encoded = Base64.encodeToString(byteArray, Base64.DEFAULT);
                }catch (Exception e){
                    Toast.makeText(getActivity().getApplicationContext(), "The media file is too large", Toast.LENGTH_SHORT).show();
                }


                // upload it to server and  get the link

                MediaModel mediaModel = new MediaModel();
                mediaModel.setKey(header.getText().toString().replace(" ","")+".png");
                mediaModel.setFile(encoded);
                ServerCall.mediaUpload(token, mediaModel, new WorkHubServiceListener<GetMediaReturnModel>() {
                    @Override
                    public void onSuccess(GetMediaReturnModel data) {
                        url = data.getUrl();
                        String desc = description.getText().toString();
                        desc = desc + "!["+ header.getText().toString() +".png](" + url + ")";
                        descriptionText = desc;
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Log.e("Job Add Media", "onFailure: " + e.getMessage());
                    }
                });

            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    // roteates image if it is not in right position

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

    // converts the bits

    private static Bitmap rotateImage(Bitmap img, int degree) {
        Matrix matrix = new Matrix();
        matrix.postRotate(degree);
        Bitmap rotatedImg = Bitmap.createBitmap(img, 0, 0, img.getWidth(), img.getHeight(), matrix, true);
        img.recycle();
        return rotatedImg;
    }
}
