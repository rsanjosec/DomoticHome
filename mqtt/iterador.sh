#!/bin/bash
echo "-----1------"
for (( n = 0; n < 100; ++n )); do
    result=`awk -v seed="$RANDOM" 'BEGIN { srand(seed); printf("%.5f\n", rand()) }'`
    pub=`mosquitto_pub -d -h localhost -p 1993 -t medicion/consumo -m $result`
    sleep .1    
done 
