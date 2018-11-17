package com.android.workhub;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.android.workhub.models.JobModel;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

        String date = new SimpleDateFormat("dd/MM/yyyy",
                Locale.getDefault()).format(currentNavigationItem.getDueDate());
        dueDate.setText(date);

        TextView categories = listItem.findViewById(R.id.categories);
        categories.setText(currentNavigationItem.getCategories()[0] + "");

        return listItem;
    }
}
