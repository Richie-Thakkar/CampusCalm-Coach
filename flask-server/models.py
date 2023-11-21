from server import mysql
class Table:
    def __init__(self, table_name, *args):
        self.table = table_name
        self.columns = "(%s)" %",".join(args)
        self.columnsList = args
    
            
    def getone(self, search, value):
        cur = mysql.connection.cursor()
        result = cur.execute("SELECT Email_ID,Password,user_type FROM %s WHERE %s = \"%s\"" %(self.table, search, value))
        if result > 0: 
            data = {}; 
            data = cur.fetchone()
            cur.close(); 
            return data
    
    def insert(self,data):
        keys = ', '.join(data.keys())
        values = ', '.join(['%s'] * len(data))
        query = f"INSERT INTO {self.table} ({keys}) VALUES ({values})"

        try:
            cursor = mysql.connection.cursor()
            cursor.execute(query, tuple(data.values()))
            mysql.connection.commit()
        except Exception as e:
            print(f"Error inserting data: {str(e)}")
            mysql.connection.rollback()
        finally:
            cursor.close()
    
    def getall(self,search,value):
        cur=mysql.connection.cursor()
        result = cur.execute("SELECT * FROM %s WHERE %s = \"%s\"" %(self.table, search, value))
        if result>0:
            data={}
            data=cur.fetchall()
            cur.close()
            return data
        
    def updateOne(self, value, attribute, anchor):
        cur = mysql.connection.cursor()
        query = "UPDATE {} SET {} = %s WHERE EMAIL_ID = %s".format(self.table, attribute)
        result = cur.execute(query, (value, anchor))
        mysql.connection.commit()
        cur.close()
        return result
    
    def updateMultiple(self, email, update_data):
        cur = mysql.connection.cursor()
        
        # Create a dynamic SET clause for updating multiple attributes
        set_clause = ", ".join([f"{key} = %s" for key in update_data.keys()])
        
        query = f"UPDATE {self.table} SET {set_clause} WHERE EMAIL_ID = %s"
        
        # Create a tuple of values for the SET clause
        values = tuple(update_data.values()) + (email,)  # Add email as the last value
        
        result = cur.execute(query, values)
        
        mysql.connection.commit()
        cur.close()
        
        return result
    
    def deleteOne(self, search, value):
        cur = mysql.connection.cursor()
        query = f"DELETE FROM {self.table} WHERE {search} = %s"
        
        cur.execute(query, (value,))
        mysql.connection.commit()

        # Check if any rows were affected by the deletion
        if cur.rowcount > 0:
            # Optionally fetch data if needed, but deletion typically doesn't return data
            # data = cur.fetchone()
            cur.close()
            return True  # Or return any desired success indication
        else:
            cur.close()
            return False  # Or return any desired failure indication



        
        

        
    