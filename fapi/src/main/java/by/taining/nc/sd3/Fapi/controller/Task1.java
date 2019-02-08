package by.taining.nc.sd3.Fapi.controller;

import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/data")


    //---------------------------------------------------------------------------------------------------------------------------------------------
public class Task1 {
    private static Scanner scanner = new Scanner(System.in);
    private static int defaultArray[];
    public static int[] getDefaultArray() {
        return defaultArray;
    }

    public static void setDefaultArray(int[] defaultArray) {
        Task1.defaultArray = defaultArray;
    }

    private int array0[];
    private int array1[];
    private int sum;
    int left = 0;
    int right = 0;
    private ArrayList<Integer>temp = new ArrayList<>();
    private ArrayList<Integer>items = new ArrayList<>();
    private ArrayList<Integer>itemsRight = new ArrayList<>();
    private ArrayList<Integer>itemsLeft = new ArrayList<>();
    private ArrayList<Integer>itemsRest = new ArrayList<>();

    @RequestMapping(value ="/weight", method = {RequestMethod.POST})
    public ResponseEntity<Integer> saveData(@RequestBody int[] gotArray) {
        setDefaultArray(gotArray);
        return ResponseEntity.ok(calculateWeights(gotArray));
    }
    @GetMapping("/leftandright")
    public ResponseEntity<Integer[][]> getLeftAndRight() {
         Integer arrayLeft[] = itemsLeft.toArray(new Integer[itemsLeft.size()]);
        Integer arrayRight[] = itemsRight.toArray(new Integer[itemsRight.size()]);
        return ResponseEntity.ok(new Integer[][]{arrayLeft,arrayRight});
    }
    @GetMapping("/rest")
    public ResponseEntity<int[]> getRest() {
        return ResponseEntity.ok(array1);
    }



//    private static int[] removeElt(int[] arr, int remIndex)
//    {
//        int[] newArr = new int[arr.length - 1];
//        for (int i = remIndex; i < arr.length-1; i++)
//        {
//            arr[i] = arr[i + 1];
//        }
//        System.arraycopy(arr, 0, newArr, 0, arr.length - 1);
//        return newArr;
//    }

    public static int sumArray(int narray[]) {
        int myArray[] = narray;
        int sum=0;
        for(int i=0; i<myArray.length; i++) {
            sum=sum+myArray[i];
        }
       return sum;
    }

    int knapsack(int narray[], int needed) {
        items.removeAll(items);
        temp.removeAll(temp);
        int n = narray.length;
        int weight;
        int dp[][] = new int[needed + 1][n + 1];
        for (int j = 1; j <= n; j++) {
            for (int w = 1; w <= needed; w++) {
                if (narray[j-1] <= w) {
                    if(dp[w][j - 1]> dp[w - narray[j-1]][j - 1] + narray[j-1]){
                        dp[w][j] = dp[w][j - 1];
                    }else{
                        dp[w][j] = dp[w - narray[j-1]][j - 1] + narray[j-1];
                    }
                } else {
                    dp[w][j] = dp[w][j - 1];
                }
            }
        }
        weight = dp[needed][n];
        int j = n;
        int w = needed;
        boolean f = false;
        while(j>0) {
           while (w < narray[j - 1]) {
               temp.add(narray[j - 1]);
                if (j==1){j=0;break;}else j=j-1;
            }
            if (j==0||w==0) break;
            if (dp[w][j] - dp[w - narray[j - 1]][j - 1] == narray[j - 1]) {
                //System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+array[j-1]);
                if (!f)
                items.add(narray[j - 1]);
                int itemsSum=0;

                for(int item:items){itemsSum=itemsSum+item;}
                if(items.size()==1)
                if (itemsSum==w){
                    f = true;
                }
                w = w - narray[j-1];
                if (j != 1)
                    j = j - 1;
                else
                    break;
            } else {
                if (j != 1)
                    j = j - 1;
                else
                    break;
            }
        }
        Collections.sort(temp);
//        int[] temp = new int[items.size()];
          System.out.println("");
           this.items.forEach(item ->{System.out.print(item + " ");});
//                for(int item:items) {
//                    boolean flag = false;
//                    int i = 0;
//                    while(i < array1.length-1){
//                    if (flag == false) {
//                        if (array1[i] != item) {
//                            temp[i]=array1[i];
//                        }
//                        else  flag = true;
//                    }else {
//                        temp[i-1]=array1[i];
//                    }
//                    i++;}
//                }
//                array1 = new int[temp.length];
              array1 =  new int[temp.size()];
        for(int i = 0;i < array1.length;i++)
            array1[i] = temp.get(i);
        System.out.println("");
        for (int i = 0; i<array1.length;i++) {
            System.out.print(array1[i] + " ");
        }
            return weight;
    }

public int calculateWeights(int[] array){
        setDefaultArray(array);
        Arrays.sort(array);
        sum = sumArray(array);
        int capacity = sum/2;

        while (capacity>0){
            System.out.println("-----------------------------------------------"+capacity);
            array0 = getDefaultArray();

            left =  knapsack(array0, capacity);
            System.out.println("left "+left);
            itemsLeft=new ArrayList<>(items);
            //itemsLeft.forEach(item ->{System.out.print(item + " ");});
            right = knapsack(array1, capacity);
            System.out.println("right "+right);
            itemsRight=new ArrayList<>(items);
            //itemsRight.forEach(item ->{System.out.print(item + "/ ");});
            if(left != right) capacity = capacity -1;
            else break;
        }
        System.out.println("**********");
            return left+right;}
}
