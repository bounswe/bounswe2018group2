package com.android.workhub.fragments;

import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.graphics.Color;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.util.TypedValue;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.R;
import com.android.workhub.models.CreateUpdateModel;
import com.android.workhub.models.JobBidModel;
import com.android.workhub.models.JobDetailModel;
import com.android.workhub.models.JobDetailReturnModel;
import com.android.workhub.models.RequestUpdateModel;
import com.android.workhub.models.SendNotificationModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.Tasks.SendNotificationTask;
import com.android.workhub.utils.WorkHubServiceListener;
import com.squareup.picasso.Picasso;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JobDetailPage extends Fragment {
    View mainView;
    private int job_id;
    TextView header;
    TextView description;
    TextView price;
    TextView due_date;
    TextView bidding_status;
    TextView duration;
    //Notify
    Button notifyButton;
    Switch customButton;
    EditText customeMessage;
    TextView messageLabel;
    //Bidding
    EditText jobBidDescription;
    EditText bidAmount;
    Button biddingButton;
    TextView jobBidDescriptionLabel;
    TextView amountLabel;
    Spinner spinnerCreateUpdate;
    Button createUpdateButton;
    Button requestUpdateButton;

    //see bids
    Button seeAllBidsButton;
    ImageView imageView;

    private String token;
    private String type;
    private String message_type;
    private String descriptionNotification;
    private boolean isMine;
    private boolean isBiddingOpen;

    TextView clientName;



    private SharedPreferences sharedPreferences;
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_jobdetail_page, container, false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity().getApplicationContext());
        token = sharedPreferences.getString("token","");
        type=sharedPreferences.getString("type","");
        isMine = getArguments().getBoolean("isMine");


        // init


        clientName=mainView.findViewById(R.id.clientName);
        job_id=getArguments().getInt("job_id");
        description=mainView.findViewById(R.id.description);
        price=mainView.findViewById(R.id.price);
        due_date=mainView.findViewById(R.id.due_date);
        bidding_status=mainView.findViewById(R.id.bidding_status);
        duration=mainView.findViewById(R.id.duration);
        header=mainView.findViewById(R.id.header);
        customButton=mainView.findViewById(R.id.customButton);
        notifyButton=mainView.findViewById(R.id.notifyButton);
        customeMessage=mainView.findViewById(R.id.customMessage);
        messageLabel =mainView.findViewById(R.id.customMessageLabel);
        jobBidDescription = mainView.findViewById(R.id.jobBidDescription);
        bidAmount = mainView.findViewById(R.id.bidAmount);
        biddingButton = mainView.findViewById(R.id.jobBidButton);
        seeAllBidsButton = mainView.findViewById(R.id.seeAllBidsButton);
        amountLabel =mainView.findViewById(R.id.textView11);
        jobBidDescriptionLabel=mainView.findViewById(R.id.textView9);
        createUpdateButton = mainView.findViewById(R.id.createUpdateButton);
        spinnerCreateUpdate = mainView.findViewById(R.id.spinnerCreateUpdate);
        requestUpdateButton=mainView.findViewById(R.id.requestUpdateButton);
        ArrayList<String> list = new ArrayList<>();
        list.add("milestone");
        list.add("completion");
        spinnerCreateUpdate.setAdapter(new ArrayAdapter<String>(getActivity().getApplicationContext(),R.layout.sample_dropdown_spinner_item,list));
        imageView = mainView.findViewById(R.id.imageView);

        if(!isMine){ // not mine job
            seeAllBidsButton.setVisibility(View.GONE);
            spinnerCreateUpdate.setVisibility(View.GONE);
            createUpdateButton.setVisibility(View.GONE);
            requestUpdateButton.setVisibility(View.GONE);

        }
        else{
            if("freelancer".equals(type)){
                spinnerCreateUpdate.setVisibility(View.VISIBLE);
                createUpdateButton.setVisibility(View.VISIBLE);
                requestUpdateButton.setVisibility(View.GONE);
            }else if("client".equals(type)){
                spinnerCreateUpdate.setVisibility(View.GONE);
                createUpdateButton.setVisibility(View.GONE);
                requestUpdateButton.setVisibility(View.VISIBLE);
            }else{ // guest
                spinnerCreateUpdate.setVisibility(View.GONE);
                createUpdateButton.setVisibility(View.GONE);
                requestUpdateButton.setVisibility(View.GONE);
            }
        }

        // custom switch

        customButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(customButton.isChecked()){
                    customeMessage.setVisibility(View.VISIBLE);
                }
                else{
                    customeMessage.setVisibility(View.GONE);
                }

            }
        });

        // see all bids

        seeAllBidsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FragmentManager manager = getFragmentManager();
                FragmentTransaction transaction = manager.beginTransaction();
                Fragment fragment = (Fragment) new AllBidsPage();
                Bundle bundle = new Bundle();
                bundle.putInt("job_id",job_id);
                fragment.setArguments(bundle);
                transaction.replace(R.id.frame,fragment);
                transaction.commit();

            }
        });

        // set job details

        ServerCall.getJobDetail(job_id, new WorkHubServiceListener<JobDetailReturnModel>() {
            @Override
            public void onSuccess(JobDetailReturnModel data) {
                header.setText(data.getJob().getHeader());
                clientName.setText(data.getJob().getClient().getFirstName()+" "+data.getJob().getClient().getLastName());
                description.setText(data.getJob().getDescription());
                price.setText("$"+data.getJob().getPrice()+"");
                SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                Date date = new Date();
                boolean isError = false;
                try {
                    date = format.parse(data.getJob().getDuedate());
                } catch (Exception e) {
                    Log.e("JobDetail", "onFailure: " + e.toString() );
                    isError = true;
                }
                if(!isError){
                    String dateString = new SimpleDateFormat("dd/MM/yyyy",
                            Locale.getDefault()).format(date);
                    due_date.setText(dateString);

                }


                if(data.getJob().getBidding_status().equals("open")){
                    bidding_status.setText("open");
                    bidding_status.setTextColor(Color.GREEN);
                    isBiddingOpen = true;
                }
                else{ // closed
                    bidding_status.setText("closed");
                    bidding_status.setTextColor(Color.RED);
                    isBiddingOpen = false;
                    jobBidDescription.setVisibility(View.GONE);
                    bidAmount.setVisibility(View.GONE);
                    biddingButton.setVisibility(View.GONE);
                    jobBidDescriptionLabel.setVisibility(View.GONE);
                    amountLabel.setVisibility(View.GONE);
                }


                duration.setText(data.getJob().getDuration()+" days");


                // set image

                boolean found = false;
                String link = "";
                Pattern p = Pattern.compile("!\\[[\\w|\\s|\\.]+\\]\\((([\\s|\\w|\\.|:|\\/|-])+)\\)");
                Matcher m = p.matcher(description.getText().toString());
                if(m.find()){
                    found = true;
                    link = m.group(1);
                    link = link.replace(" ","");
                    Picasso.get()
                            .load(link)
                            .resize((int)dpToPx(250), (int)dpToPx(150))
                            .into(imageView);


                }

                if(found){
                    description.setText(description.getText().toString().substring(0,description.getText().toString().indexOf("!")));
                }else{
                    description.setText(description.getText().toString());
                }
            }

            @Override
            public void onFailure(Exception e) {
                Log.e("JobDetail", "onFailure: " + e.toString() );
            }
        });

        // notify freelancer if client, else otherwise

        notifyButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SendNotificationModel model = new SendNotificationModel();
                model.setJob_id(job_id);
                if(customButton.isChecked()){
                    model.setMessage_type("custom");
                    model.setDescription(customeMessage.getText().toString());
                }
                else {
                    model.setMessage_type("status");
                }

                ServerCall.sendNotification(token, model, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        customButton.setVisibility(View.GONE);
                        notifyButton.setVisibility(View.GONE);
                        customeMessage.setVisibility(View.GONE);
                        messageLabel.setVisibility(View.GONE);
                        Toast.makeText(getActivity().getApplicationContext(), "Successfully", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        biddingButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                JobBidModel model = new JobBidModel();
                if(bidAmount.getText().toString().equals("")||jobBidDescription.getText().toString().equals("")){
                   return;
                }
                model.setAmount(Integer.parseInt(bidAmount.getText().toString()));
                model.setDescription(jobBidDescription.getText().toString());
                model.setJob_id(job_id);
                ServerCall.createJobBid(token, model, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(getActivity().getApplicationContext(), "Success", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(getActivity().getApplicationContext(), "Failed", Toast.LENGTH_SHORT).show();

                    }
                });
            }
        });

        //for guest user
        if(sharedPreferences.getString("token","").equals("")){
            customButton.setVisibility(View.GONE);
            notifyButton.setVisibility(View.GONE);
            customeMessage.setVisibility(View.GONE);
            messageLabel.setVisibility(View.GONE);
            notifyButton.setVisibility(View.GONE);
            customButton.setVisibility(View.GONE);
            customeMessage.setVisibility(View.GONE);
            messageLabel.setVisibility(View.GONE);

            jobBidDescription.setVisibility(View.GONE);
            bidAmount.setVisibility(View.GONE);
            biddingButton.setVisibility(View.GONE);
            jobBidDescriptionLabel.setVisibility(View.GONE);
            amountLabel.setVisibility(View.GONE);

        }
        else{
            if(type.equals("client")){
                jobBidDescription.setVisibility(View.GONE);
                bidAmount.setVisibility(View.GONE);
                biddingButton.setVisibility(View.GONE);
                jobBidDescriptionLabel.setVisibility(View.GONE);
                amountLabel.setVisibility(View.GONE);
            }
            //for freelance
            else {
                seeAllBidsButton.setVisibility(View.INVISIBLE);
            }



        }

        // create update

        createUpdateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
               String update = spinnerCreateUpdate.getSelectedItem().toString();
               CreateUpdateModel model = new CreateUpdateModel(job_id,update);

               ServerCall.createUpdate(token, model, new WorkHubServiceListener<SimpleMessageModel>() {
                   @Override
                   public void onSuccess(SimpleMessageModel data) {
                       Toast.makeText(getActivity().getApplicationContext(), "Update Created", Toast.LENGTH_SHORT).show();
                   }

                   @Override
                   public void onFailure(Exception e) {
                       Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                   }
               });
            }
        });

        // request update

        requestUpdateButton.setOnClickListener(new View.OnClickListener() {
            RequestUpdateModel model=new RequestUpdateModel(job_id);
            @Override
            public void onClick(View view) {
                ServerCall.requestUpdate(token,model, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(getActivity().getApplicationContext(), "Update is success", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });


/*
        //Notify
        Button notifyButton;
        Switch customButton;
        EditText customeMessage;
        TextView messageLabel;
        //Bidding
        EditText jobBidDescription;
        EditText bidAmount;
        Button biddingButton;
        TextView jobBidDescriptionLabel;
        TextView amountLabel;
        */


        return mainView;
    }

    public static float dpToPx(int dip){
        Resources r = Resources.getSystem();
        float px = TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                dip,
                r.getDisplayMetrics()
        );
        return px;
    }


}
