#include<iostream>
#include<cstring>
#include<string>
using namespace std;

struct BankAccount 
{
    char accountNumber[20];
    double balance;
    string name, cnic;
};
BankAccount accounts[100];
int accountCount = 0;

void createAccount() 
{
    if(accountCount < 100) 
	{
        BankAccount newAccount;
        cout<<"Enter Account Holder Name: ";
        cin>>newAccount.name;
        cout<<"Enter ID Card Number(CNIC): ";
        cin>>newAccount.cnic;
        cout<<"Enter account number: ";
        cin>>newAccount.accountNumber;
        cout<<"Enter initial balance: $";
        cin>>newAccount.balance;
        accounts[accountCount++]=newAccount;
        cout<<"Account created successfully."<<endl;
    } 
	else 
	{
        cout<<"Cannot create more accounts. Limit reached."<<endl;
    }
}

void deleteAccount(const char*accountNumber) 
{
    for(int i=0;i<accountCount;++i)
	{
        if(strcmp(accounts[i].accountNumber,accountNumber)==0) 
		{
            for(int j=i;j<accountCount-1;++j) 
			{
                accounts[j]=accounts[j+1];
            }
            --accountCount;
            cout<<"Account "<<accountNumber<<" deleted."<<endl;
            return;
        }
    }
    cout<<"Account "<<accountNumber<<" not found."<<endl;
}
void deposit(const char*accountNumber,double amount) 
{
    for (int i=0;i<accountCount;++i) 
	{
        if(strcmp(accounts[i].accountNumber,accountNumber)==0) 
		{
            accounts[i].balance+=amount;
            cout<<"$"<<amount<<" deposited into account "<< accountNumber
                      <<". New balance: $"<<accounts[i].balance<<"."<<endl;
            return;
        }
    }
    cout<<"Account "<<accountNumber<<" not found."<<endl;
}
void withdraw(const char*accountNumber,double amount) 
{
    for(int i=0;i<accountCount;++i) 
	{
        if (strcmp(accounts[i].accountNumber,accountNumber)==0) 
		{
            if(accounts[i].balance>=amount) 
			{
                accounts[i].balance-=amount;
                cout<<"$"<<amount<<" withdrawn from account "<<accountNumber
                          <<". New balance: $"<<accounts[i].balance<<"."<<endl;
            } 
			else 
			{
                cout<<"Insufficient funds in account "<<accountNumber<<"."<<endl;
            }
            return;
        }
    }
    cout<<"Account "<<accountNumber<<" not found."<<endl;
}
void transfer(const char*fromAccount,const char* toAccount,double amount) 
{
    withdraw(fromAccount,amount);
    deposit(toAccount,amount);
}

void displayAccounts() 
{
    cout<<"\nBank Accounts:\n";
    for(int i=0;i<accountCount;++i) 
	{
        cout<<"Account Number: "<<accounts[i].accountNumber
                  <<", Balance: $"<<accounts[i].balance<<endl;
    }
    cout<<endl;
}
int main() 
{
    int option;
    char fromAccount[20],toAccount[20];
    double amount;
    do 
	{
        cout<<"Banking Options:\n";
        cout<<"1. Create Account\n";
        cout<<"2. Delete Account\n";
        cout<<"3. Deposit\n";
        cout<<"4. Withdraw\n";
        cout<<"5. Transfer\n";
        cout<<"6. Display Accounts\n";
        cout<<"0. Exit\n";
        cout<<"Enter option: ";
        cin>>option;
        switch (option) 
		{
            case 1:
                createAccount();
                break;
            case 2:
                cout<<"Enter account number to delete: ";
                cin>>fromAccount;
                deleteAccount(fromAccount);
                break;
            case 3:
                cout<<"Enter account number for deposit: ";
                cin>>fromAccount;
                cout<<"Enter deposit amount: $";
                cin>>amount;
                deposit(fromAccount,amount);
                break;
            case 4:
                cout<<"Enter account number for withdrawal: ";
                cin>>fromAccount;
                cout<<"Enter withdrawal amount: $";
                cin>>amount;
                withdraw(fromAccount, amount);
                break;
            case 5:
                cout<<"Enter source account number: ";
                cin>>fromAccount;
                cout<<"Enter destination account number: ";
                cin>>toAccount;
                cout<<"Enter transfer amount: $";
                cin>>amount;
                transfer(fromAccount,toAccount,amount);
                break;
            case 6:
                displayAccounts();
                break;
            case 0:
                cout<<"Exiting program.\n";
                break;
            default:
                cout<<"Invalid option. Please try again.\n";
        }
    } 
	while(option!=0);
    return 0;
}