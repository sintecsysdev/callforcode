# Project Title

##### Environmental Fire Outbreak Detection. 

# Code Example

We developed an algorithm that automatically identifies smoke, informing the coordinate of the fire outbreak within an average of 3 minutes from the start of the fire. The intelligence of the developed software allows a monitoring radius of up to 9,5 miles of distance, the equivalent to up to 172,500 acres of area, reducing the losses caused by fires up to 90%.
The system has a tower equipped with a 360-degree broad and approximate view, operating 24 hours. The precision of this technology lies in a coordinated triangulation. An alert is issued and if the network-monitoring operator confirms the outbreak, it is possible to issue an alarm directly to the fire department.
Another difference of this solution lies in the unique algorithms and equipment, which allow external signal independence, ensuring and facilitating the optimisation of data capture and transmission.
For the smoke detection algorithm to work efficiently, it needs a high-end appliance with state of the art hardware and long distance radio communications. To achieve a high-performance detection level the hardware must be integrated throughout a graphical language (G code) named Labview.

With the Call For Code Initiative, our purpose is to integrate the detection algorithm (G CODE) with IBM APIs such as"
Watson Analytics (Smart Farm)
Weather Company Alerts
Weather Alerts for Insurance
Integrating the G CODE with IBM APIs solutions we intend to improve the level of information integrated from both languages and reach an improved level of information in order to prevent wildfires even before it starts, such as:

### Code Examples

1 - Universal Data Store Manager - 
Implementation of the key-value interface:


```sh
package com.ibm.storage.storagemanager.implementations.guava;

import java.util.List;
import java.util.Map;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.ibm.storage.storagemanager.util.Constants;

import static com.ibm.storage.storagemanager.util.Constants.NUM_UNKNOWN;

/**
 * @author ArunIyengar
 * 
 */
public class KeyValueGuava<K,V> implements com.ibm.storage.storagemanager.interfaces.KeyValue<K, V> {

    private LoadingCache<K,V> cache;

    /**
     * Constructor
     * 
     * @param maxObjects
     *            maximum number of objects which can be stored before
     *            replacement starts
     * 
     * */
    public KeyValueGuava(long maxObjects) {
        cache = CacheBuilder.newBuilder().maximumSize(maxObjects)
                .build(new CacheLoader<K,V>() {
                    public V load(K key) throws Exception {
                        return null;
                    }
                });
    }
  
    /**
     * delete all entries from the storage service
     * 
     * @return status code
     * 
     * */
   @Override
   public ReturnStatus clear() {
        cache.invalidateAll();
        return ReturnStatus.SUCCESS;
    }

    /**
     * delete a key-value pair
     * 
     * @param key
     *            key corresponding to value
     * 
     * @return # of objects deleted, NUM_UNKNOWN if unknown
     * 
     * */
    @Override
    public int delete(K key) {
        cache.invalidate(key);
        return NUM_UNKNOWN;
    }

    /**
     * delete one or more key-value pairs
     * 
     * @param keys
     *            iterable data structure containing the keys to delete
     * 
     * @return # of objects deleted, NUM_UNKNOWN if unknown
     * 
     * */
    @Override
    public int deleteAll(List<K> keys) {
        cache.invalidateAll(keys);        
        return NUM_UNKNOWN;
    }

    /**
     * look up a value
     * 
     * @param key
     *            key corresponding to value
     * @return value corresponding to key, null if key is not present
     * 
     * */
    @Override
    public V get(K key) {
        return cache.getIfPresent(key);
    }

    /**
     * look up one or more values.
     * 
     * @param keys
     *            iterable data structure containing the keys to look up
     * @return map containing key-value pairs corresponding to data
     * 
     * */
    @Override
    public Map<K, V> getAll(List<K> keys) {
        return  cache.getAllPresent(keys);
    }

    /**
     * Return a string idenfitying the type of storage service
     * 
     * @return string identifying the type of storage service
     * */
    @Override
    public String storeType() {
        return Constants.GUAVA;
    }
    
    /**
     * store a key-value pair
     * 
     * @param key
     *            key associated with value
     * @param value
     *            value associated with key
     * 
     * @return status code
     * 
     * */
    @Override
    public ReturnStatus put(K key, V value) {
        cache.put(key, value);
        return ReturnStatus.SUCCESS;
    }

    /**
     * store one or more key-value pairs
     * 
     * @param map
     *            map containing key-value pairs to store
     * 
     * @return # of objects stored, NUM_UNKNOWN if unknown
     * 
     * */
    @Override
    public int putAll(Map<K, V> map) {
        cache.putAll(map);
        return NUM_UNKNOWN;
    }
 
    /**
     * Return number of objects in cache
     * 
     * */
    @Override
    public long size() {
        return cache.size();
    }

    /**
     * Return contents of entire cache in a string
     * 
     * @return string containing output
     * 
     * */
    @Override
    public String toString() {
        Map<K,V> cacheMap = cache.asMap();
        String result = "\nContents of Entire Cache\n\n";
        for (Map.Entry<K,V> entry : cacheMap.entrySet()) {
            result = result + "Key: " + entry.getKey() + "\n";
            V cacheEntry = entry.getValue();
            if (cacheEntry == null) {
                result = result + "CacheEntry is null\n";
            }
            else {
                result = result + cacheEntry.toString();
            }
            result = result + "\n\n";
        }
        result = result + "Cache size is: " + size() + "\n";
        return result;
    }
    
}

```


### KeyValue interface with Cloudant:

```sh
package com.ibm.storage.storagemanager.tests;
import java.util.Arrays;
import org.junit.Test;
import com.ibm.storage.storagemanager.implementations.cloudant.KeyValueCloudant;
import com.ibm.storage.storagemanager.implementations.monitor.MonitoredKeyValue;
import com.ibm.storage.storagemanager.implementations.monitor.RequestStats;
import com.ibm.storage.storagemanager.implementations.monitor.StorageStats;
import com.ibm.storage.storagemanager.interfaces.KeyValue;
import com.ibm.storage.storagemanager.util.Constants;
import com.ibm.storage.storagemanager.util.Util;
import com.ibm.storage.storagemanager.util.Constants.RequestType;

public class MonitoredTests {

    // File with cloudant URL, username, and password should be entered here
    private static final String CONFIG_FILE =  Util.configFile(Constants.CLOUDANT);
    
    KeyValue<String, Integer> datastore2 = new KeyValueCloudant<String, Integer>("db1",
            CONFIG_FILE, true);

    MonitoredKeyValue<String, Integer> datastore = new MonitoredKeyValue<String, Integer>(datastore2, 10);

    @Test
    public void testUpdate() {      
        String key1 = "key1";
        System.out.println("testUpdate: start");
        datastore.clear();
        datastore.put(key1, 42);
        Integer val1 = datastore.get(key1);
        System.out.println(datastore.toString());
        datastore.put(key1, 43);
        val1 = datastore.get(key1);
        System.out.println(datastore.toString());
        datastore.put(key1, 44);
        val1 = datastore.get(key1);
        try {
            Thread.sleep(1000);
        } catch (Exception e) {
            
        }
        System.out.println(datastore.toString());
        StorageStats stats = datastore.getStorageStats();
        System.out.println(stats.allStats());
        System.out.println("Total number of requests: " + stats.getNumRequests());
        System.out.println("Total time spent on storage: " + stats.getTotalRequestTime());
        System.out.println("Start time: " + stats.getStartTime());
        System.out.println("End time: " + stats.getEndTime());
        stats.setEndTimeNow();
        System.out.println("New End time: " + stats.getEndTime());
        System.out.println("Store type: " + stats.getStoreType());
        RequestStats stats2 = stats.getRequestData(RequestType.PUT);
        System.out.println("Statistics for request type: " + stats2.getRequestType());
        System.out.println("Number of requests: " + stats2.getNumRequests());
        System.out.println("Time taken by requests: " + stats2.getTotalRequestTime());
        System.out.println("Recent request times: " + Arrays.toString(stats2.getRecentRequestTimes()));
        System.out.println("testUpdate: end\n");
        try {
            Thread.sleep(300);
        } catch (Exception e) {
        }
        stats.setStartTimeNow();
        System.out.println("new start time: " + stats.getStartTime());
        datastore.clearStorageStats();
        stats = datastore.getStorageStats();
        System.out.println("Stats after being cleared");
        System.out.println(stats.allStats());
    }
  
}
```

### Methods to Access Data Stores:

```sh
datastore.put(key1, 42);
int numStored = datastore.putAll(map);
val = datastore.get(key);
Map<String, Integer> map = datastore.getAll(list);
datastore.delete(key2);
numDeleted = datastore.deleteAll(list);
datastore.clear();
datastore.storeType();
System.out.println("Data store size: " + datastore.size());
System.out.println(datastore.toString());
```

### Package Main

```sh
import (
	"time"
	"github.com/spf13/viper"
	"github.com/IBM/FfDL/commons/config"
	"github.com/IBM/FfDL/commons/logger"
	"github.com/IBM/FfDL/commons/metricsmon"
	"github.com/IBM/FfDL/commons/util"
	"github.com/IBM/FfDL/trainer/trainer"
)
func main() {
	config.InitViper()
	logger.Config()
	port := viper.GetInt(config.PortKey)
	if port == 0 {
		port = 30005 // TODO don't hardcode
	}
	service := trainer.NewService()
	var stopSendingMetricsChannel chan struct{}
	if config.CheckPushGatewayEnabled() {
		stopSendingMetricsChannel = metricsmon.StartMetricsPusher("trainer", 30*time.Second, config.GetPushgatewayURL()) //remove this once pull based metrics are implemented
	}
	util.HandleOSSignals(func() {
		service.StopTrainer()
		if config.CheckPushGatewayEnabled() {
			stopSendingMetricsChannel <- struct{}{}
		}
	})
	service.Start(port, false)
}
```

### VIPER

```sh
package viper
import "github.com/spf13/pflag"
// FlagValueSet is an interface that users can implement
// to bind a set of flags to viper.
type FlagValueSet interface {
	VisitAll(fn func(FlagValue))
}

// FlagValue is an interface that users can implement
// to bind different flags to viper.
type FlagValue interface {
	HasChanged() bool
	Name() string
	ValueString() string
	ValueType() string
}

// pflagValueSet is a wrapper around *pflag.ValueSet
// that implements FlagValueSet.
type pflagValueSet struct {
	flags *pflag.FlagSet
}

// VisitAll iterates over all *pflag.Flag inside the *pflag.FlagSet.
func (p pflagValueSet) VisitAll(fn func(flag FlagValue)) {
	p.flags.VisitAll(func(flag *pflag.Flag) {
		fn(pflagValue{flag})
	})
}

// pflagValue is a wrapper aroung *pflag.flag
// that implements FlagValue
type pflagValue struct {
	flag *pflag.Flag
}

// HasChanges returns whether the flag has changes or not.
func (p pflagValue) HasChanged() bool {
	return p.flag.Changed
}

// Name returns the name of the flag.
func (p pflagValue) Name() string {
	return p.flag.Name
}

// ValueString returns the value of the flag as a string.
func (p pflagValue) ValueString() string {
	return p.flag.Value.String()
}

// ValueType returns the type of the flag as a string.
func (p pflagValue) ValueType() string {
	return p.flag.Value.Type()
}
```

### IBM Cloud Mobile Services

```sh
Build.gradle:
compile 'com.ibm.mobilefirstplatform.clientsdk.android:core:3.0.0'

Import the library:
import com.ibm.mobilefirstplatform.clientsdk.android.core.api.*;

Initialize the BMSClient:
BMSClient.getInstance().initialize(getApplicationContext(), BMSClient.REGION_US_SOUTH); 

Create a NetworkConnectionListener to get notified of network connection changes:
NetworkConnectionListener networkListener = new NetworkConnectionListener() {
    @Override
    public void networkChanged(NetworkConnectionType newConnection) {
        Log.i("MyApp", "Network connection changed to " + newConnection.toString());
    }
};

For the NetworkConnectionListener use the following methods:
networkMonitor.startMonitoringNetworkChanges();
networkMonitor.stopMonitoringNetworkChanges();


Create a new Request with the URL and an HTTP verb:
String resourceURL = "http://httpbin.org/GET";
int timeout = 500; // milliseconds
Request request = new Request(resourceURL, Request.GET, timeout);

Add headers and query parameters as follows:
Map<String, String> queryParameters = new HashMap<>();
queryParameters.put("key", "value");
request.setQueryParameters(queryParameters);
request.addHeader("Content-Type", "text/plain");

Define a ResponseListener:
class MyResponseListener implements ResponseListener {
   @Override
    public void onSuccess(Response response) {
        if (response != null) {
            Log.i("MyApp", "Response status: " + response.getStatus());
            Log.i("MyApp", "Response headers: " + response.getHeaders());
            Log.i("MyApp", "Response body: " + response.getResponseText());
        }
    }
    @Override
    public void onFailure(Response response, Throwable t, JSONObject extendedInfo) {
        if (response != null) {
            Log.i("MyApp", "Response status: " + response.getStatus());
            Log.i("MyApp", "Response body: " + response.getResponseText());
        }
        if (t != null && t.getMessage() != null) {
            Log.i("MyApp", "Error: " + t.getMessage());
        }
    }
}

Download:
ProgressListener progressListener = new MyProgressListener();
ResponseListener responseListener = new MyResponseListener();
String url = "https://cdn.spacetelescope.org/archives/images/screen/heic1502a.jpg";
Request request = new Request(url, Request.GET);
request.download(getApplicationContext(), progressListener, responseListener);

Upload:
ProgressListener progressListener = new MyProgressListener();
ResponseListener responseListener = new MyResponseListener();
byte[] uploadData = new byte[1000000];
new Random().nextBytes(uploadData);
String url = "http://httpbin.org/post";
Request request = new Request(url, Request.POST);
request.upload(getApplicationContext(), uploadData, progressListener, responseListener);
End Code.
```
