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
import android.widget.TextView;

import com.android.workhub.models.JobModel;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class JobAdapter extends ArrayAdapter {

    private Context mContext;
    private List<JobModel> jobList = new ArrayList<>();

    public JobAdapter(@NonNull Context context, @SuppressLint("SupportAnnotationUsage") @LayoutRes ArrayList<JobModel> list ){
        super(context, 0, list);
        mContext = context;
        jobList = list;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        View listItem = convertView;
        if(listItem == null)
            listItem = LayoutInflater.from(mContext).inflate(R.layout.sample_job_item,parent,false);

        JobModel currentNavigationItem = jobList.get(position);

        TextView header = (TextView) listItem.findViewById(R.id.header);
        header.setText(currentNavigationItem.getHeader());

        TextView description = (TextView) listItem.findViewById(R.id.description);
        description.setText(currentNavigationItem.getDescription());

        TextView dueDate = (TextView) listItem.findViewById(R.id.dueDate);
        if(currentNavigationItem.getDueDate()!=null){
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:sss'Z'");
            Date date = new Date();
            try {
                date = format.parse(currentNavigationItem.getDueDate());
            } catch (ParseException e) {
                Log.e("JobDetail", "onFailure: " + e.toString() );
            }
            String dateString = new SimpleDateFormat("dd/MM/yyyy",
                    Locale.getDefault()).format(date);
            dueDate.setText(dateString);
        }

        TextView price = (TextView) listItem.findViewById(R.id.price);
        price.setText("$"+ currentNavigationItem.getPrice());

        TextView status = (TextView) listItem.findViewById(R.id.status);


        if(currentNavigationItem.getBidding_status()!=null){
            if(currentNavigationItem.getBidding_status().equals("open")){
                status.setText(currentNavigationItem.getBidding_status());
                status.setTextColor(Color.GREEN);
            }else{
                status.setText("closed");
                status.setTextColor(Color.RED);
            }
        }else{
            status.setText("closed");
            status.setTextColor(Color.RED);
        }


        TextView duration = (TextView) listItem.findViewById(R.id.duration);

        duration.setText(currentNavigationItem.getDuration() + " days");












        if(currentNavigationItem.getCategories()!=null){
            TextView categories = listItem.findViewById(R.id.categories);
            categories.setText(currentNavigationItem.getCategories()[0] + "");
        }


        return listItem;
    }
}
