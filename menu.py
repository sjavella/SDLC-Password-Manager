# Password Manager
import random
import string



def store_password():
    # username
    username = str(input("Your username: "))
    # website
    website = str(input("Website: "))
    # generate random password
    digit = int(input("How many digits do you want in your password? (Exact integer only) "))
    password = ""
    for i in range(digit):
        char = random.choice(string.ascii_letters)
        password += char

    # store the password into a file
    f = open("password.txt", "a")
    f.write(f"{username}-{website}-{str(password)}\n")
    f.close()

    print(f"Here's your password: {password}")


#######

def search():
    username_or_website = str(input("Do you want to search for username or website? "))
    value = str(input("What username or website (whichever that you chose) do you want to retrieve the password for? "))
    f = open("password.txt", "r")
    for line in f:
        info = line.split("-")
        if username_or_website == "username":
            if value == info[0]:
                return info[2]
            # search by username
        else:
            # search by website
            if value == info[1]:
                return info[2]

password = input('Welcome to the password manager! Please enter your secret key to gain access. \nPassword: ')

if password == "UHManoa2021":
    print('Correct. You now have access to your password manager.')

else:
    print('Incorrect password. Access denied.')
    exit()

print("Welcome to your password manager! What would you like to do today?")
print("1. Make a new password\n2. Check existing passwords\n3. Exit")
choice = 0

while choice != '3':
    choice = input()
    if choice == '1':
        print('choice one')
        store_password()
    if choice == '2':
        print('choice two')
        result = search()
        if result == None:
            print("No result found")
        else:
            print(f"Here's your password: {result}")
if choice == '3':
        print('Goodbye!')
exit()




"""
Salt: made up of random bits (0, 1) added to each password instance before its hashing. (auth0.com)
"""
