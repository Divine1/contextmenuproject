import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit,OnDestroy {

@Output() closeCompareWindow:any =  new EventEmitter();

  constructor() { }


   	leftdata={
		"ZipCode": "94304",
		"Quantity": "1",
		"City": "Palo Alto",
		"paymentType": "FUND",
		"TestCaseIdToBeOutPut": "OrderCreation_Term_CSP_1",
		"environment": "cstage",
		"AddressLine1": "3401 Hillview Ave bangalore",
	}
	rightdata={
		"ZipCoder": "94304",
		"Quantity": "1",
		"City": "moscow",
		"paymentType": "FUND",
		"TestCaseIdToBeOutPut": "OrderCreation_Term_CSP_1",
		"location": "msprod",
		"AddressLine1": "3401 Hillview Ave",
		"State": "CA",
		"Currency": "USD",
		"demo": "adma",
		"Country": "US",
		"id": "1",
		"demo2k": "demo2v",
		"OrderedItem": "CAA-A1BSA-12PT0-C1S",
		"tradeid": "ffd3837a200f49959c1d8db3a0fa81691542016421329"
	}

	formattedLeftData=[];
	formattedRightData=[];
	leftTestdataMetadata={};
	rightTestdataMetadata={};
  ngOnInit(): void {
    
	this.leftTestdataMetadata={
		testdataname : "left testdata name",
		testdataid :""
	}
	this.rightTestdataMetadata={
		testdataname : "right testdata name",
		testdataid :""
	}

	let sortedLeftData = this.transformKeyValueInArray(this.sortKeydata(this.leftdata),this.leftdata);
	let sortedRightData = this.transformKeyValueInArray(this.sortKeydata(this.rightdata),this.rightdata);

	console.log("before sortedLeftData ",sortedLeftData)
	console.log("before sortedRightData ",sortedRightData)

	let leftsize = sortedLeftData.length;
	let rightsize = sortedRightData.length;

	let order=-1;
	for(let i=0;i<leftsize;i++){

		let leftItem = sortedLeftData[i];
		let flag=false;
		order++;
		for(let j=0;j<rightsize;j++){
			let rightItem = sortedRightData[j];
			
			if(!rightItem.marked && (leftItem.key == rightItem.key)){
				rightItem.marked=true;
				rightItem.order=order;
				if(leftItem.value == rightItem.value){
					rightItem.match=true;
					flag=true;
				}
				
				break;
			}
		}
		leftItem.marked=true;
		leftItem.order=order;
		if(flag){
			leftItem.match=true;
		}
	}


	for(let i=0;i<rightsize;i++){
		let rightItem = sortedRightData[i];

		if(!rightItem.marked){
			order++;
			/*
			for(let j=0;j<leftsize;j++){
				let leftItem = sortedLeftData[j];
				
				if(!leftItem.marked && (leftItem.key == rightItem.key)){
					leftItem.marked=true;
					leftItem.order=order;
					break;
				}

			}
			*/
			rightItem.marked=true;
			rightItem.order=order;

		}
	}


	console.log("after sortedLeftData ",sortedLeftData)
	console.log("after sortedRightData ",sortedRightData)



	

	let orderLeftData = this.sortArrayOfObjectData(sortedLeftData);
	let orderRightData = this.sortArrayOfObjectData(sortedRightData);
	console.log("after order orderLeftData ",orderLeftData)
	console.log("after order  orderRightData ",orderRightData)

	
	if(leftsize <rightsize){
		
		let maxOrderValue = this.getMaxOrderValue(orderRightData);

		for(let i=leftsize;i<=maxOrderValue;i++){
			orderLeftData.push({});
		}

		let temp=[];
		for(let i=0;i<=maxOrderValue;i++){

			let selectedIndex = orderRightData.findIndex((item:any)=>{
				return item.order == i;
			});
			if(selectedIndex <0){
				temp.push({});
			}
			else{
				temp.push(orderRightData[selectedIndex]);
			}
			
		}
		orderRightData=temp;
	}
	else{
		let temp=[];
		for(let i=0;i<leftsize;i++){

			let selectedIndex = orderRightData.findIndex((item:any)=>{
				return item.order == i;
			});
			if(selectedIndex <0){
				temp.push({});
			}
			else{
				temp.push(orderRightData[selectedIndex]);
			}
			
		}
		orderRightData=temp;
	}
	console.log("after order fill orderLeftData ",orderLeftData)
	console.log("after order fill  orderRightData ",orderRightData)
	this.finalTransformation(orderLeftData,orderRightData);
	
  }


  finalTransformation(orderLeftData,orderRightData){
	this.verifyAndAssignValueMatchProperty(orderLeftData,orderRightData);

	this.formattedLeftData=orderLeftData;
	this.formattedRightData=orderRightData;

	console.log("this.formattedLeftData ",this.formattedLeftData);
	console.log("this.formattedRightData ",this.formattedRightData);
  }


  verifyAndAssignValueMatchProperty(leftData,rightData){
	let maxSize = leftData.length;

	for(let i=0;i<maxSize;i++){
		let leftItem = leftData[i];
		let rightItem = rightData[i];

		if(leftItem.value){
			leftItem.match=false;
		}
		if(rightItem.value){
			rightItem.match=false;
		}

		if(leftItem.value && rightItem.value){
			if(leftItem.value == rightItem.value){
				leftItem.match=true;
				rightItem.match=true;
			}
		}
	}
  }

  getMaxOrderValue(data){
	
	let maxOrder=0;
	data.forEach((item)=>{
		if(item.order && maxOrder < item.order){
			maxOrder=item.order;
		}
	});
	return maxOrder;
  }

  sortArrayOfObjectData(data){
	for(let i=0;i<data.length-1;i++){
		for(let j=i+1;j<data.length;j++){

			if(data[i].order>data[j].order){
				let temp = data[i];
				data[i]=data[j];
				data[j]=temp;
				
			}
		}
	}
	return data;
  }

  sortKeydata(datamap){
	let keydata = Object.keys(datamap);
	return keydata.sort();
  }

  transformKeyValueInArray(sortedKeydata,dataMap){
	return sortedKeydata.map((item)=>{
		return {
			key : item,
			value : dataMap[item],
			marked : false,
			order: -1,
			match:false
		}
	});
  }

  closeCompareWindowFun(){
	this.closeCompareWindow.emit(false);
  }

  historyOfChanges:any=[];
  mergeToOther(event){
	console.log("WorkspaceComponent mergeToOther event ",event);

	let order = event.item.order;


	if(event.position == "left"){
		//have to merge data from leftside to rightside. so we have to backup previous data and current data of the right side
		let currentValue = this.formattedRightData.find((item,index)=>{
			return index == order;
		});
		this.historyOfChanges.push({
			previousValue : currentValue,
			newValue : event.item,
			position :"right"
		});
	}
	else if(event.position == "right"){
		//have to merge data from rightside to leftside. so we have to backup previous data and current data of the left side
		let currentValue = this.formattedLeftData.find((item,index)=>{
			return index == order;
		});
		this.historyOfChanges.push({
			previousValue : currentValue,
			newValue : event.item,
			position :"left"
		});
	}
	console.log("this.historyOfChanges ",this.historyOfChanges);

	let orderLeftData = this.formattedLeftData.map((originalItem,index)=>{
		if(index == order){
			return event.item;
		}
		else{
			return originalItem;
		}
	});

	let orderRightData = this.formattedRightData.map((originalItem,index)=>{
		if(index == order){
			return event.item;
		}
		else{
			return originalItem;
		}
	});

	
	this.finalTransformation(orderLeftData,orderRightData)

  }
  undoChanges(){
	console.log("in WorkspaceComponent undoChanges historyOfChanges ",this.historyOfChanges)

	let poppedItem = this.historyOfChanges.pop();
	console.log("poppedItem ",poppedItem," this.historyOfChanges ",this.historyOfChanges);

	let orderValueFromNewItem = poppedItem.newValue.order;
	if(poppedItem.position == "left"){
		
		let orderLeftData = this.formattedLeftData.map((originalItem,index)=>{
			if(index == orderValueFromNewItem){
				return poppedItem.previousValue;
			}
			else{
				return originalItem;
			}
		});
		this.finalTransformation(orderLeftData,this.formattedRightData);


	}
	else if(poppedItem.position == "right"){
		
		let orderRightData = this.formattedRightData.map((originalItem,index)=>{
			if(index == orderValueFromNewItem){
				return poppedItem.previousValue;
			}
			else{
				return originalItem;
			}
		});
		this.finalTransformation(this.formattedLeftData,orderRightData);
	}
  }
  saveChanges(){
	console.log("in WorkspaceComponent saveChanges ")
  }
  ngOnDestroy(){
	console.log("in WorkspaceComponent ngOnDestroy")
  }
}
