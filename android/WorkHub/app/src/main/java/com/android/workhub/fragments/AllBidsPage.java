package com.android.workhub.fragments;

import android.app.Fragment;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.Toast;

import com.android.workhub.BidAdapter;
import com.android.workhub.R;
import com.android.workhub.models.BidModel;
import com.android.workhub.models.GetAllBidsReturnModel;
import com.android.workhub.utils.ServerCall;
import com.android.workhub.utils.WorkHubServiceListener;

import java.util.ArrayList;

public class AllBidsPage extends Fragment {
    View mainView;
    SharedPreferences sharedPreferences;
    String token;
    int job_id;
    ListView list;
    ArrayList<BidModel> bidList;
    BidAdapter bidAdapter;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        mainView = inflater.inflate(R.layout.fragment_allbids_page, container, false); //değişecek
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(getActivity());
        //type=sharedPreferences.getString("type","");
        token = sharedPreferences.getString("token","");
        job_id=getArguments().getInt("job_id",0);
        list = mainView.findViewById(R.id.bidList);


        bidList = new ArrayList<>();
        bidAdapter=new BidAdapter(getActivity().getApplicationContext(),bidList);
        list.setAdapter(bidAdapter);
        ServerCall.getAllBids(token, job_id, new WorkHubServiceListener<GetAllBidsReturnModel>() {
            @Override
            public void onSuccess(GetAllBidsReturnModel data) {
                for(BidModel bid:data.getBids()){
                    if(bid.getStatus().equals("waiting")){
                        bidList.add(bid);
                        bidAdapter.notifyDataSetChanged();
                    }

                }
            }

            @Override
            public void onFailure(Exception e) {
                Toast.makeText(getActivity().getApplicationContext(), e.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });




        return mainView;
    }
}
