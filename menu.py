

password = input('Welcome to the password manager! Please enter the secret key to gain access. \nPassword: ')

if password == "UHManoa2021":
    print('You\'re in')

else:
    print('no luck')
    exit()

print("Welcome to your password manager! What would you like to do today?")
print("1. Make a new password\n2. Check existing passwords\n3. Exit")
choice = 0

while choice != '3':
    choice = input()
    if choice == '1':
        print('choice one')
    if choice == '2':
        print('choice two')
    if choice == '3':
        print('Goodbye!')
exit()

#    if choice == '3':
#        print('choice three')

#    else:
#        choice = input()
