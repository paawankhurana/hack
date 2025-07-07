import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f6fff7',
    padding: 32,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#228B22',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  section: {
    marginBottom: 14,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#e6f4ea',
  },
  label: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  signature: {
    marginTop: 40,
    borderTop: '1pt solid #888',
    width: 180,
    alignSelf: 'flex-end',
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    paddingTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'right',
  },
});

const Certificate = ({ project, investor, quantity, price, date }) => {
  const total = quantity * price;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Green Bond Purchase Certificate</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Project:</Text>
            <Text style={styles.value}>{project}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Investor:</Text>
            <Text style={styles.value}>{investor}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bonds Purchased:</Text>
            <Text style={styles.value}>{quantity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Price per Bond:</Text>
            <Text style={styles.value}>${price}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Paid:</Text>
            <Text style={styles.value}>${total}</Text>
          </View>
        </View>
        <Text style={styles.date}>Purchase Date: {date}</Text>
        <View style={styles.signature}>
          <Text>Authorized Signature</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate; 