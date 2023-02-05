import java.util.*;
class hashmap{
    public static void main(String[] args){
        HashMap<Integer,Integer> map = new HashMap<>();
        int arr[] = {1,1,2,3};
        for(int i = 0;i<arr.length;i++){
            map.put(arr[i],map.getOrDefault(arr[i],0)+1);
            //System.out.println(arr[i]+" "+map.getOrDefault(arr[i],0));
        }
        System.out.print("1 is occuring"+map.get(1)+" times");
        for(Map.Entry<Integer,Integer> entry : map.entrySet()){
            int key = entry.getKey();
            int value = entry.getValue();
            System.out.println(key+" "+value);
        }
    }
}