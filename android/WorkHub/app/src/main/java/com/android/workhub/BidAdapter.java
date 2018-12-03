package com.android.workhub;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
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

import com.android.workhub.models.BidModel;
import com.android.workhub.models.JobModel;

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


        BidModel currentNavigationItem = bidList.get(position);
        acceptButton = listItem.findViewById(R.id.acceptButton);
        rejectButton =listItem.findViewById(R.id.rejectButton);
        name = listItem.findViewById(R.id.name);
        description = listItem.findViewById(R.id.description);
        amount = listItem.findViewById(R.id.amount);

        amount.setText(currentNavigationItem.getAmount()+"");
        description.setText(currentNavigationItem.getDescription());
        name.setText(currentNavigationItem.getFreelancer().getFirstName()+" "+currentNavigationItem.getFreelancer().getLastName());




        return listItem;
    }
}
