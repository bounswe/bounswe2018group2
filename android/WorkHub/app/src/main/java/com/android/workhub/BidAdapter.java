package com.android.workhub;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.preference.PreferenceManager;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.workhub.models.BidModel;
import com.android.workhub.models.JobModel;
import com.android.workhub.models.PostBidModel;
import com.android.workhub.models.SimpleMessageModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class BidAdapter extends ArrayAdapter {

    private Context mContext;
    private List<BidModel> bidList = new ArrayList<>();
    TextView description;
    TextView amount;
    TextView name;
    Button acceptButton;
    Button rejectButton;
    private SharedPreferences sharedPreferences;
    private String token;

    public BidAdapter(@NonNull Context context, @SuppressLint("SupportAnnotationUsage") @LayoutRes ArrayList<BidModel> list ){
        super(context, 0, list);
        mContext = context;
        bidList = list;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View listItem = convertView;
        if(listItem == null)
            listItem = LayoutInflater.from(mContext).inflate(R.layout.sample_bid_item,parent,false);
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(mContext);
        token = sharedPreferences.getString("token","");


        // init

        final BidModel currentNavigationItem = bidList.get(position);
        acceptButton = listItem.findViewById(R.id.acceptButton);
        rejectButton =listItem.findViewById(R.id.rejectButton);
        name = listItem.findViewById(R.id.name);
        description = listItem.findViewById(R.id.description);
        amount = listItem.findViewById(R.id.amount);

        amount.setText("$" + currentNavigationItem.getAmount());
        description.setText(currentNavigationItem.getDescription());
        name.setText(currentNavigationItem.getFreelancer().getFirstName()+" "+currentNavigationItem.getFreelancer().getLastName());

        // accept bid

        acceptButton.setOnClickListener(new View.OnClickListener() {
            PostBidModel model = new PostBidModel(currentNavigationItem.getId());
            @Override
            public void onClick(View view) {
                remove(currentNavigationItem);
                ServerCall.acceptBid(token, model, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(mContext,"Bid accepted",Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(mContext,e.getMessage(),Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        // reject bid

        rejectButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                PostBidModel model = new PostBidModel(currentNavigationItem.getId());
                ServerCall.rejectBid(token, model, new WorkHubServiceListener<SimpleMessageModel>() {
                    @Override
                    public void onSuccess(SimpleMessageModel data) {
                        Toast.makeText(mContext,"Bid rejected",Toast.LENGTH_SHORT).show();
                        remove(currentNavigationItem);
                    }

                    @Override
                    public void onFailure(Exception e) {
                        Toast.makeText(mContext,e.getMessage(),Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });


        return listItem;
    }
}
